import "./accountScreen.scss";
import React from "react";
import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";
import { deleteCookie } from "../../helpers/cookieHelper";
import { Button, Container } from "react-bootstrap";
import LoadingScreen from "../loadingScreen/LoadingScreen";

function AccountScreen() {
  const { auth, setAuth } = useContext(AuthContext);

  const { data, loading, error, text } = useFetch("app_user/" + auth.id, {
    method: "POST",
    body: JSON.stringify({ with: ["account"] }),
  });

  if (loading) return <LoadingScreen />;

  if (error) {
    console.log(error, text);
    return <div>Error ! </div>;
  }

  console.log("data:", data);

  return (
    <>
      <main>
        <Container fluid>
          <h1>AccountScreen</h1>
          {auth.role > 0 && (
            <Button
              className="btn btn-primary"
              onClick={(e) => {
                setAuth({ role: 0, id: 0 });
                deleteCookie("blog");
                window.location.href = "/";
              }}
            >
              Log out
            </Button>
          )}
        </Container>
      </main>
    </>
  );
}
export default AccountScreen;
