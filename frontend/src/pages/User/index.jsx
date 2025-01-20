import { useEffect, useState } from "react";
import Account from "../../components/Account";
import "./style.scss";
import accountData from "../../account.json";
import { useSelector, useDispatch } from "react-redux";
import { updateUserName, fetchUserProfile } from "../../redux/userNameSlice";

function User() {
  const [showsection, setShowsection] = useState(true);
  useEffect(() => {}, [showsection]);
  const { firstName, userName, lastName, loading, error, token } = useSelector(
    (state) => state.usernames
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token));
    }
  }, [dispatch, token]);

  const [newUserName, setNewUserName] = useState(userName);
  useEffect(() => {
    setNewUserName(userName);
  }, [userName]);

  const handleSave = (e) => {
    e.preventDefault();

    dispatch(
      updateUserName({
        userName: newUserName,
      })
    );

    setShowsection(!showsection);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setShowsection(!showsection);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error}</p>;
  }
  return (
    <div className="User">
      {showsection && (
        <section className="header">
          <h1>
            Welcome back <br />
            {firstName} {lastName}!
          </h1>
          <button onClick={() => setShowsection(!showsection)}>
            Edit Name
          </button>
        </section>
      )}
      {!showsection && (
        <section className="user-info">
          <p>Edit user info</p>
          <form onSubmit={handleSave}>
            <div className="label-input">
              <label htmlFor="user-name">User name:</label>
              <input
                type="text"
                id="user-name"
                name="user-name"
                placeholder={userName || ""}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="label-input">
              <label htmlFor="first-name">First name:</label>
              <input
                className="readOnly"
                type="text"
                id="first-name"
                name="first-name"
                value={firstName || ""}
                readOnly
              />
            </div>
            <div className="label-input">
              <label htmlFor="last name">Last name:</label>
              <input
                className="readOnly"
                type="text"
                id="last name"
                name="last-name"
                value={lastName || ""}
                readOnly
              />
            </div>
            <div>
              <button>Save</button>
            </div>
          </form>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </section>
      )}
      <ul>
        {accountData.map((account) => (
          <Account
            key={account.id}
            title={account.title}
            somme={account.somme}
            sousTitre={account.sousTitre}
          />
        ))}
      </ul>
    </div>
  );
}
export default User;
