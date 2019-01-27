import React from "react";

// types
import { ILoginProps, ILoginState } from ".";

// components
import { ScrollView } from "@components/ScrollView";

// styles
import style from "./login.styles";

export class Login extends React.Component<ILoginProps, ILoginState> {
  render(): React.ReactNode {
    return (
      <>
        <p className={style.example}>Login</p>
        <ScrollView height={300} snapToPosition>
          {
            <div
              style={{
                height: 800,
                backgroundImage: "linear-gradient(red, yellow)"
              }}
            />
          }
        </ScrollView>
      </>
    );
  }
}
