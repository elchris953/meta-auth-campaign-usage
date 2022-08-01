import './App.css';
import {useState} from "react";

function App() {
  const [login, setLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [fbAccounts, setFbAccounts] = useState(null);

  const fbScope = {
    scope: 'ads_read,ads_management,read_insights'
  }

  const setUserData = (response) => {
    setAccessToken(response.authResponse.accessToken)
    setUserId(response.authResponse.userID)
    setLogin(true);
    setFbAccounts(null);
  }

  const initFbLogin = async () => {
    window.FB.getLoginStatus(function(response) {
      if(response.status === 'connected') setUserData(response)

      if(!response.status || ['not_authorized', 'unknown'].includes(response.status)){
        window.FB.login(function(response) {
          setUserData(response)
        }, fbScope)
      }
    });
  }

  const logoutFbUser = async () => {
    window.FB.logout(function () {
      setLogin(false);
    })
  }

  const getAccounts = () => {
    window.FB.api(
      `/${userId}/adaccounts`,
      function (response) {
        if (response && !response.error) {
          setFbAccounts(response.data);
        }
      }
    );
  }

  return (
    <div className="App center">
      {
        login ?
        <div>
          <div className='accessTokenContainer'>
            <h3>Logged in successful</h3>
            <br/>
            <span><b>Access token:</b> {accessToken}</span>
            <br/>
            <span><b>User id:</b> {userId}</span>
            <br/>
            <span><b>Accounts: {JSON.stringify(fbAccounts)}</b> </span>
          </div>


          <button onClick={getAccounts}>Get accounts</button>
          <button onClick={logoutFbUser}>Logout</button>
        </div> :
        <button onClick={initFbLogin}>Start Login</button>
      }
    </div>
  );
}

export default App;
