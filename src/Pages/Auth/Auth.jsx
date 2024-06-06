import React, { useEffect, useState } from "react";
import { GoogleLogout }  from '@leecheuk/react-google-login';
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../../actions/currentUser";
import "./Auth.css";
function Auth({ User, setAuthBtn, setEditCreateChanelBtn }) {

  const dispatch = useDispatch();
  const onLogOutSuccess = () => {
    dispatch(setCurrentUser(null));
    alert("Log Out SuccessFully");
  };
  
  const [points,setPoints]=useState(0);
  const Fetch = async () => {
    try {
      const response = await fetch(
        `https://youtubeclone007jnv.onrender.com/user/points/?email=${User.result.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      // console.log(data);
      setPoints(data.points);


     
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
 useEffect(()=>{
      Fetch();
 },[])
//  console.log(User)
  
  return (
    <div className="Auth_container" onClick={() => setAuthBtn(false)}>
      <div className="Auth_container2">
        <p className="User_Details">
          <div className="Chanel_logo_App">
            <p className="fstChar_logo_App">
              {User?.result.name ? (
                <>{User?.result.name.charAt(0).toUpperCase()} </>
              ) : (
                <>{User?.result.email.charAt(0).toUpperCase()} </>
              )}
            </p>
          </div>
          <div className="email_Auth">{User?.result.email}</div>
          <div className="email_Auth">Points:{points}</div>
        </p>
        <div className="btns_Auth">
          {User?.result.name ? (
            <>
              {
                <Link to={`/chanel/${User?.result._id}`} className="btn_Auth">
                  Your Channel
                </Link>
              }
            </>
          ) : (
            <>
              <input
                type="submit"
                className="btn_Auth"
                value="Create Your Chanel"
                onClick={() => setEditCreateChanelBtn(true)}
              />
            </>
          )}

          <div>
            <GoogleLogout
              clientId={
                "565866976001-kogc3n05n90ug8i92r0t40tl8co0fhse.apps.googleusercontent.com"
              }
              onLogoutSuccess={onLogOutSuccess}
              render={(renderProps) => (
                <div onClick={renderProps.onClick} className="btn_Auth">
                  <BiLogOut />
                  Log Out
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
