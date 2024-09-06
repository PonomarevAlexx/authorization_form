import React from "react";
import { useState } from "react";
import { validate } from "email-validator";

import "./Form.css";

export default function Form() {
    const [emailValue, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isOk, setIsOk] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate(emailValue)) {
            try {
                const formData = new FormData(e.target);

                let res = await fetch("http://localhost:3001/users", {
                    method: "POST",
                    body: JSON.stringify(formData),
                });

                // let result = await res.json();
                if (res.ok) setIsOk(true);
            } catch (error) {
                console.error(error);

                setEmail("");
                setPassword("");
            }
        } else {
            alert("Invalid Email Address!");

            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="container">
            <div className="form">
                {!isOk ? (
                    <div>
                        <h1>Log In</h1>
                        <form id="form" action="#" onSubmit={handleSubmit}>
                            <div className="form-content">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    value={emailValue}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="form-content">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                            <button className="btn" type="submit">
                                Login
                            </button>
                        </form>
                    </div>
                ) : (
                    <h2>Successfully</h2>
                )}
            </div>
        </div>
    );
}
