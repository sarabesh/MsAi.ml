
from flask import Flask, flash, redirect, render_template, request, session, abort
from  flaskext.mysql import   MySQL
from  flask_uploads   import  UploadSet, configure_uploads, IMAGES
from  random import randint
import json
import pandas as pd
import numpy as np
from sklearn.multiclass import OneVsOneClassifier
from sklearn.svm import LinearSVC
import pickle
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.models import load_model
from operator import itemgetter
from flask_restful import Resource,reqparse,Api
from sklearn.preprocessing import LabelEncoder
from collections import defaultdict
import matplotlib.pyplot as plt 
import os




app=Flask(__name__,static_url_path="/static")
app.secret_key='ironman'
api=Api(app)
mysql=MySQL()
app.config['MYSQL_DATABASE_USER']='root'
app.config['MYSQL_DATABASE_PASSWORD']=''
app.config['MYSQL_DATABASE_DB']='aidb'
app.config['MYSQL_DATABASE_HOST']='localhost'
mysql.init_app(app)

#method to convert list to dictionary for json
def list_to_dict(li):
     ctt=0
     dct = {}
     for item in li:
         dct[ctt]=item
         ctt=ctt+1
     return dct




#method to get details of college from collegetable given college name
def GetDetails(clg):
  conn=mysql.connect()
  cursor=conn.cursor()
  check_stmt=("SELECT * FROM collegetable WHERE collegeName=%s")
  check_data=(clg)
  cursor.execute(check_stmt,check_data)
  data=cursor.fetchall()
  return list(data)

#method used to predict modified KNN
def predict(X_train, y_train, x_test, k):
    # create list for distances and targets
      distances = []
      targets = []
      for i in range(len(X_train)):
        # first we compute the euclidean distance
        distance = np.sqrt(np.sum(np.square(x_test - X_train.values[i, :])))
        # add it to list of distances
        distances.append([distance, i])
    # sort the list
      distances = sorted(distances)
    # make a list of the k neighbors' targets
      i=0
      while len(list(set(targets)))<k:
        index=distances[i][1]
        val=y_train[index]
        i=i+1
        targets.append(val)

      return list(set(targets))


@app.route("/testmethod",methods=['GET'])
def testmethod():
  User = request.args.get('nm')
  print(User)
  return render_template("index1.html")


@app.route("/testi")
def index():
    return redirect("http://localhost:1234")

@app.route('/Question')
def Question():
  conn=mysql.connect()
  cursor=conn.cursor()
  check_stmt=("SELECT * FROM questions")
  cursor.execute(cursor)
  rep=cursor.fetchall()
  return render_template("Questions.html",**locals())


#method to perform nlp and grade the text
@app.route('/SOP',methods=['POST'])
def SOP():
  if request.method=='POST':
    input=request.form['input']
    clgmain=request.form['main']
    clg1=request.form['clg1']
    clg2=request.form['clg2']
    clg3=request.form['clg3']
    clg4=request.form['clg4']
    clg5=request.form['clg5']
    clg6=request.form['clg6']
    uInput=request.form['userInput']
    userInput=float(uInput)
    perfect=clgmain
    alist=[]
    alist.append(clg1)
    alist.append(clg2)
    alist.append(clg3)
    alist.append(clg4)
    alist.append(clg5)
    alist.append(clg6)
  list_sentences_train=np.load('123.npy')
  list_sentences_test=np.array([input])
  list_sentences_test.size
  maxlen=100
  max_features = 15352 # how many unique words to use (i.e num rows in embedding vector)
  tokenizer = Tokenizer(num_words=max_features)
  tokenizer.fit_on_texts(list(list_sentences_train))
  list_tokenized_train = tokenizer.texts_to_sequences(list_sentences_train)
  list_tokenized_test = tokenizer.texts_to_sequences(list_sentences_test)
  X_te = pad_sequences(list_tokenized_test, maxlen=maxlen)
  model = load_model('my_model.h5')
  y_test = model.predict([X_te], batch_size=1024, verbose=1)
  y_classes = y_test.argmax(axis=-1)
  op=y_classes[0]
  mainPerfect=GetDetails(perfect)
  num=userInput/(float(mainPerfect[0][5]))
  num=num*100
  mainPerfect.append(num)
  mainPerfect.append(((userInput/(float(mainPerfect[0][5]))*100)+((op/mainPerfect[0][6])*100))/2)
  print(mainPerfect)
  mainList=[]
  for i in alist:
      lk=[]
      lk=(GetDetails(i));
      lk.append(userInput/(float(lk[0][5]))*100)
      lk.append(((userInput/(float(lk[0][5]))*100)+((op/lk[0][6])*100))/2)
      mainList.append(lk);

  highList=[]
  lowList=[]
  for i in mainList:
      if i[0][4]>mainPerfect[0][4]:

        highList.append(i)
      else:
        lowList.append(i)
  print(highList)
  highList=sorted(highList,key=itemgetter(2))
  highList.reverse()
  lowList=sorted(lowList,key=itemgetter(2))
  lowList.reverse()
  list1=[]
  for i in highList:
      list1.append(list(i))
  for i in list1:
      i.append('high')
  list2=[]
  for i in lowList:
      list2.append(list(i))
  for i in list1:
      i.append('low')

  return render_template("SOP.html",**locals())

#method for home
@app.route("/")
def home():
    return render_template("index1.html")

#method for login
@app.route('/LogIn',methods=['POST'])
def Log_In():
  if request.method=='POST':
    email=request.form['email']
    password=request.form['password']
  conn=mysql.connect()
  cursor=conn.cursor()
  view_stmt=("SELECT * FROM users WHERE Password=%s AND Email=%s")
  view_data=(password,email)
  cursor.execute(view_stmt,view_data)
  data=cursor.fetchall()
  if len(data) is 0:
      pid=0
      message="login failed! try again"
      return render_template('login_fail.html',**locals())
  else:
      return render_template('run.html',**locals())



#method for sign up
@app.route('/SignUp',methods=['POST'])
def Sign_Up():
  if request.method=='POST':
    email=request.form['email']
    password=request.form['password']
  conn=mysql.connect()
  cursor=conn.cursor()
  check_stmt=("SELECT * FROM users WHERE email=%s")
  check_data=(email)
  cursor.execute(check_stmt,check_data)
  checkd=cursor.fetchall()
  if len(checkd)>0:
        return render_template('login_fail.html',message='name already exists')
  else:
            insert_stmt=("INSERT INTO users VALUES (%s,%s)")
            insert_data=(email,password)
            cursor.execute(insert_stmt,insert_data)
            data=cursor.fetchall()
            if len(data) is 0:
                conn.commit()
                return render_template('run.html',**locals())
            else:
                message="login failed! try again"
                return render_template('login_fail.html',**locals())


#method to find colleges input:marks
@app.route('/GetColleges', methods=['POST'])
def Get_Colleges():
    if request.method=='POST':
        gpa=request.form['gpa']
        gre=request.form['gre']
        lang=request.form['lang']
    c=0
    #converting string to int
    gpa=int(float(gpa))
    gre=int(float(gre))
    lang=int(float(lang))
    #getting squised input
    userInput=((gre*100/340)+gpa+lang)/3
    #reading data set that contains history of admits
    df = pd.read_csv("gredatasetmain.csv")
    # X contains gre,gpa and lang-independent variables
    X=df.iloc[:,[1,2,3]]
    # labels contains college names-dependent variable
    labels=df.iloc[:,[0]]
    #to encode the colleges into numbers
    le_X=LabelEncoder()
    labels.values[:,0]=le_X.fit_transform(labels.values[:,0])
    labelVal=labels.values.ravel()
    labelVal=labelVal.astype('int')
    listx=[]
    #Xt contains input
    Xt=([gre,lang,gpa])
    #call userdefined KNN function - fin contains 7 colleges encoded numbers
    fin=predict(X,labelVal,Xt,7)
    # for main college selection using SVC already loaded model is used
   # ovo=OneVsOneClassifier(LinearSVC(random_state=0)).fit(X, labelVal)
    filename = 'finalized_model.sav'
    ovo = pickle.load(open(filename, 'rb'))
    perfect=ovo.predict([[gre,lang,gpa]])
    perfect=perfect[0]
    #perfect contains college number
    if perfect in fin:
      fin.remove(perfect)
    for op in fin:
      i=labels.index[labels['name'] == op].tolist()#getting the number where the college occured
      i=i[0]
      listx.append(df.iloc[i,0])#getting name of college at i in .csv
    mainList=[]
    for i in listx:
      lk=list(GetDetails(i))#gets college details from college table for i
      lk.append((userInput/(float(lk[0][5])))*100)#adding probability for lk for user scores
      mainList.append(lk)
    #getting number for main college
    i=labels.index[labels['name'] == perfect].tolist()
    i=i[0]
    perfect=df.iloc[i,0]#getting name for main college
    mainPerfect=GetDetails(perfect)
    mainPerfect.append(userInput/(float(mainPerfect[0][5]))*100)# adding probability for main college based on user input
    #sorting high and low list based on rank
    highList=[]
    lowList=[]
    for i in mainList:
      if i[0][4]>mainPerfect[0][4]:
        highList.append(i[0])
      else:
        lowList.append(i[0])
    highList=sorted(highList,key=itemgetter(4))
    lowList=sorted(lowList,key=itemgetter(4))
    list1=[]
    for i in highList:
      list1.append(list(i))
    for i in list1:
      i.append('high')
    list2=[]
    for i in lowList:
      list2.append(list(i))
    for i in list2:
      i.append('low')

    
    plt.scatter([i[1] for i in highList],[i[5] for i in highList])
    plt.plot(mainPerfect[0][1],mainPerfect[0][5],'g*')

    #plt.xlabel('Insulin')
    #plt.ylabel('glucose')
    os.remove('static/inputvscsv.png')
    plt.savefig('static/inputvscsv.png')
    
    
    return render_template("answer.html",**locals())

@app.route('/GetColleges2', methods=['POST'])
def Get_Colleges2():
    if request.method=='POST':
        gpa=request.form['gpa']
        gre=request.form['gre']
        lang=request.form['lang']
        exp=request.form['exp']
    gpa=int(float(gpa))
    gre=int(float(gre))
    lang=int(float(lang))
    exp=int(float(exp))
    exp=exp/100
    userInput=((gre*100/340)+gpa+lang)/3
    df = pd.read_csv("gsvv2.csv")
    X=df.iloc[:,[1,2,3,4]]
    labels=df.iloc[:,[0]]
    from sklearn.preprocessing import LabelEncoder
    le_X=LabelEncoder()
    labels.values[:,0]=le_X.fit_transform(labels.values[:,0])
    labelVal=labels.values.ravel()
    labelVal=labelVal.astype('int')
    listx=[]
    Xt=([gre,lang,gpa,exp])
    fin=predict(X,labelVal,Xt,7)
    filename = 'fimo2.sav'
    ovo = pickle.load(open(filename, 'rb'))
    perfect=ovo.predict([[gre,lang,gpa,exp]])
    perfect=perfect[0]
    if perfect in fin:
      fin.remove(perfect)
    for op in fin:
      i=labels.index[labels['name'] == op].tolist()
      i=i[0]
      listx.append(df.iloc[i,0])
    mainList=[]
    for i in listx:
        lk=list(GetDetails(i))#gets college details from college table for i
        lk.append((userInput/(float(lk[0][5])))*100)#adding probability for lk for user scores
        mainList.append(lk)
      #getting number for main college
    i=labels.index[labels['name'] == perfect].tolist()
    i=i[0]
    perfect=df.iloc[i,0]#getting name for main college
    mainPerfect=GetDetails(perfect)
    mainPerfect.append(userInput/(float(mainPerfect[0][5]))*100)# adding probability for main college based on user input
      #sorting high and low list based on rank
    highList=[]
    lowList=[]
    for i in mainList:
        if i[0][4]>mainPerfect[0][4]:
          highList.append(i[0])
        else:
          lowList.append(i[0])
    highList=sorted(highList,key=itemgetter(4))
    lowList=sorted(lowList,key=itemgetter(4))
    list1=[]
    for i in highList:
        list1.append(list(i))
    for i in list1:
        i.append('high')
    list2=[]
    for i in lowList:
        list2.append(list(i))
    for i in list2:
        i.append('low')
    return render_template("answer.html",**locals())



class GetCollegesApi(Resource):
  def post(self):
    parser=reqparse.RequestParser()
    parser.add_argument('gre',type=str)
    parser.add_argument('gpa',type=str)
    parser.add_argument('lang',type=str)
    args=parser.parse_args()
    gpa=args['gpa']
    gre=args['gre']
    lang=args['lang']
    c=0
    gpa=int(float(gpa))
    gre=int(float(gre))
    lang=int(float(lang))
    userInput=((gre*100/340)+gpa+lang)/3
    df = pd.read_csv("gredatasetmain.csv")
    X=df.iloc[:,[1,2,3]]
    labels=df.iloc[:,[0]]
    le_X=LabelEncoder()
    labels.values[:,0]=le_X.fit_transform(labels.values[:,0])
    labelVal=labels.values.ravel()
    listx=[]
    Xt=([gre,lang,gpa])
    fin=predict(X,labelVal,Xt,7)
   # ovo=OneVsOneClassifier(LinearSVC(random_state=0)).fit(X, labelVal)
    filename = 'finalized_model.sav'
    ovo = pickle.load(open(filename, 'rb'))
    perfect=ovo.predict([[gre,lang,gpa]])
    perfect=perfect[0]
    if perfect in fin:
      fin.remove(perfect)
    for op in fin:
      i=labels.index[labels['name'] == op].tolist()
      i=i[0]
      listx.append(df.iloc[i,0])
    mainList=[]
    for i in listx:
      lk=[]
      lk=(GetDetails(i));
      lk.append((userInput/(float(lk[0][5])))*100)
      mainList.append(lk);
    i=labels.index[labels['name'] == perfect].tolist()
    i=i[0]
    perfect=df.iloc[i,0]
    mainPerfect=GetDetails(perfect)
    highList=[]
    lowList=[]
    for i in mainList:
      if i[0][4]>mainPerfect[0][4]:
        highList.append(i[0])
      else:
        lowList.append(i[0])
    highList=sorted(highList,key=itemgetter(4))
    lowList=sorted(lowList,key=itemgetter(4))
    mainPerfectDict=list_to_dict(mainPerfect)
    dicti={}
    dicti['match']=(mainPerfect)
    dicti['safety']=(highList)
    dicti['reach']=(lowList)
    return (dicti)

api.add_resource(GetCollegesApi,'/api')



if __name__=='__main__':
    app.run(host='0.0.0.0',port=80,debug=True)
