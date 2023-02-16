import classes from "./styles/Login.module.css";

function Login() {
  return (
    <div className={classes.container}>
      <h1>Login</h1>
      <form>
        <label for="phoneNumber">Phone Number</label>
        <input type="number" id="phoneNumber" name="phoneNumber" required />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
