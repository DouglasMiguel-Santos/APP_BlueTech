export default (props, { $, app }) => {
  const signIn = () => {
    var username = $("input#demo-username-1").val();
    var password = $("input#demo-password-1").val();
    app.dialog.alert(
      "Username: " + username + "<br />Password: " + password,
      function () {
        app.loginScreen.close();
      }
    );
  };

  return $render;
};
