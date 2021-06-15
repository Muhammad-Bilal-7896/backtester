import React, { useEffect } from 'react';
import './App.css';

//Here importing firebase 
import firebase from "./firebase/index";

function App() {
  const [status, setStatus] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [allfirebaseData, setAllfirebaseData] = React.useState<Array<Object>>([]);


  useEffect(() => {
    loadData();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setStatus(true);
      }
      else {
        setStatus(false);
      }
    })
  }, [])


  const loadData = () => {
    let seller_data: Array<Object> = [];
    //Taking data from job vacancy form
    firebase.database().ref(`WithSignIn/`).on('value', (snapshot) => {
      snapshot.forEach(function (data) {
        seller_data.push(data.val())
      })
      console.log(seller_data);
      setAllfirebaseData(seller_data);
    })

    // firebase.database().ref(`/`).on('value', (snapshot) => {
    //   snapshot.forEach(function (data) {
    //     console.log("Here==> "+Object.keys(data.val()));
    //   })
    // })
  }

  const login = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        //var user = userCredential.user;
        // console.log("The user is logged in and data is: " + user);
        alert("Logged in successfully")
        setStatus(true);

      })
      .catch((error) => {
        // var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage)
      });
  }

  const sign_out = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      alert("Signed Out Successfully");

      setStatus(false)

    }).catch((error) => {
      // An error happened.
      console.log(error)
      alert(error);
    });

  }


  const reset_password = () => {
    var auth = firebase.auth();
    var emailAddress = "bilalmohib7896@gmail.com";
    auth.sendPasswordResetEmail(emailAddress).then(function () {
      // alert(`A password reset email has been sent to ${emailAddress}.`)
    }).catch(function (error) {
      // An error happened.
      alert(error)
      // return;
    });
    alert(`A password reset email has been sent to ${emailAddress}.`)
  }

  const deleteItem = (e: string) => {
    let userRef = firebase.database().ref(`WithSignIn/${e}`);
    userRef.remove()
    alert("Deleted the item Successfully");
  }

  return (
    <div className="App">
      {(status) ? (
        <>
          <br />
          <button className="btn-logout" onClick={sign_out}>logout</button>
          <br />
          <br />

          <div className="border">
            <h4>Here I will show firebase realtime database data</h4>
            <ol className="list">
              {allfirebaseData.map(({ key, url, title, selectLocation, price, mobilePhone, itemCondition, description, dateTime, SubCategory, SellerName, SellerEmail, Category }: any) => {
                return <li className="rendered-list" key={key}>
                  <div className="border1px">
                    <img className="img-ad" src={url} alt="An ad for seller" />
                    <h1>{title}</h1>
                    <p><b>Category: </b> {Category}</p>
                    <p><b>Location: </b> {selectLocation}</p>
                    <p><b>Item Price: </b> {price}</p>
                    <p><b>Phone: </b> {mobilePhone}</p>
                    <p><b>Condition: </b> {itemCondition}</p>
                    <p><b>Sub-Category: </b> {SubCategory}</p>
                    <hr />
                    <p><b>SellerEmail: </b> {SellerEmail}</p>
                    <p><b>SellerName: </b> {SellerName}</p>
                    <p><b>description: </b> {description}</p>
                    <p><b>DateTime Submitted:</b>{dateTime}</p>
                    <button className="deletebtn" onClick={() => deleteItem(key)}>Delete Item</button>
                  </div>
                </li>
              })}
            </ol>
          </div>
        </>
      ) : (
        <div>
          <h1>Not Logged In</h1>
          <div className="container text-center">
            <img width="250px" src="data:image/png;base64,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" alt="Team Overc’s" />
            <br /> <br />
            {/* <label className="form-label">Email Address (required)</label> <br/> */}
            <input type="email" name="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control adminInput" />
            <br />
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control adminInput" />
            <br />

            <p onClick={reset_password}>Forgot Password</p>
            <br />
            <button className="btn btn-primary btn-login" onClick={login}>Login</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
