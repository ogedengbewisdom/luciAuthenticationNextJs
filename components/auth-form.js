"use client";

import { signUp } from "@/actions/auth-action";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function AuthForm({ mode }) {
  const [actionState, actionFunction] = useFormState(signUp, {});
  // console.log(mode);
  return (
    <form id="auth-form" action={actionFunction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        {actionState.email && <span id="form-errors">{actionState.email}</span>}
      </p>

      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        {actionState.password && (
          <span id="form-errors">{actionState.password}</span>
        )}
      </p>
      {actionState.errors && (
        <ul id="form-errors">
          {Object.keys(actionState.errors).map((error, index) => {
            return <li key={index}>{actionState.errors[error]}</li>;
          })}
        </ul>
      )}
      <p>
        <button type="submit">
          {mode === "login" ? "login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" ? (
          <Link href="/?mode=signup">Create an account</Link>
        ) : (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
        {/* <Link href="/">Login with existing account.</Link> */}
      </p>
    </form>
  );
}
