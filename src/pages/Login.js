import { useState } from "react";

import { Link,useNavigate } from "react-router-dom";
import Authenticate from "./Authenticate";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const Navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    console.log(email,password);
    console.log("Submitted");
    const isValid = Authenticate(email, password, isLogin);
    // console.log(isValid);
    setIsLogin(isValid);
  };
  return (
    <>
    
    <div className="auth-container  bg-base ">
      <div className="auth-box flex flex-col items-center justify-center text-white h-full">
        <h1 className="font-primary">Login to SkillConnect</h1>
        <div className="border p-4 border-primary">
        <form onSubmit={handleSubmit} className=" flex flex-col items-center justify-center gap-2 text-black">
          <input type="email" 
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="Email" 
          className="p-2 w-full"
          required />
          <input type="password" 
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="Password" 
          className="p-2 w-full"
          required />

          <button type="submit" className="bg-primary p-2 w-full text-base font-bold hover:bg-lime-400">Login</button>
        </form>
<Link to="/register" className="toggle-text">
  <p className="text-muted font-primary mt-4 hover:text-white">Don't have an account? Register</p>
</Link>
</div>


      </div>
      {isLogin && Navigate("/home")}
    </div>

    </>
  );
}
