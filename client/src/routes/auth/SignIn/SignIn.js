import { h, Component, Fragment } from "preact";
import { TextField } from "../../../components/ui/TextField";
import { Button } from "../../../components/ui/Button";

export default class SignIn extends Component {
  state = {

  };

  render() {
    return (
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <TextField
              id="username"
              type="text"
              placeholder="Username"
              label="Username"
              name='username'
            />
          </div>
          <div className="mb-6">
            <TextField
              id="password"
              type="text"
              placeholder="******************"
              label="Password"
              labelClasses="block text-gray-700 text-sm font-bold mb-2"
              classes="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name='password'
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              buttonText="Sign In"
              classes="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            />
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    );
  }
}
