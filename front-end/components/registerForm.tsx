import UserService from "@/services/userService";
import router from "next/router";
import React, { useState } from "react";
import { Profile } from "@/types";
import { useTranslation } from "next-i18next";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setStatusMessage(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearErrors();
    if (!validate()) {
      return;
    }

    console.log("Registering...");

    let profile: Profile | undefined = undefined;
    if (email || bio || firstName || lastName) {
      profile = {
        email,
        bio,
        firstName,
        lastName,
      };
    }
    console.log(profile);

    const response = await UserService.createUser(username, password, profile);

    if (response.status === 200) {
      const autheticationResponse = await response.json();

      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          token: autheticationResponse.token,
          username: autheticationResponse.username,
          leaderOfGroups: autheticationResponse.leaderOfGroups,
          memberOfGroups: autheticationResponse.memberOfGroups,
        })
      );

      setStatusMessage("Registration successful. Redirecting to home page...");
      setTimeout(() => {
        router.push("/");
      }, 500);
    } else {
      const message = await response.json();
      setStatusMessage(message.message || "An error occurred");
      console.error(message);
    }
  };

  const validate = () => {
    let valid = true;
    console.log("Validating...");

    if (!username) {
      setUsernameError("Username is required");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    }

    return valid;
  };

  const { t } = useTranslation();

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded"
    >
      <div className="mb-4">
        <label
          htmlFor="usernameInput"
          className="block text-gray-700 font-bold mb-2"
        >
          {t("register.username")}
        </label>
        <input
          id="usernameInput"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        {usernameError && (
          <div className="text-red-500 mt-1">{usernameError}</div>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="passwordInput"
          className="block text-gray-700 font-bold mb-2"
        >
          {t("register.password")}
        </label>
        <input
          id="passwordInput"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        {passwordError && (
          <div className="text-red-500 mt-1">{passwordError}</div>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="firstNameInput"
          className="block text-gray-700 font-bold mb-2"
        >
          {t("register.firstName")}
        </label>
        <input
          id="firstNameInput"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="lastNameInput"
          className="block text-gray-700 font-bold mb-2"
        >
          {t("register.lastName")}
        </label>
        <input
          id="lastNameInput"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="emailInput"
          className="block text-gray-700 font-bold mb-2"
        >
          {t("register.email")}
        </label>
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="bioInput"
          className="block text-gray-700 font-bold mb-2"
        >
          {t("register.bio")}
        </label>
        <textarea
          id="bioInput"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit">{t("header.register")}</button>
      {statusMessage && <div>{statusMessage}</div>}
    </form>
  );
};

export default RegisterForm;
