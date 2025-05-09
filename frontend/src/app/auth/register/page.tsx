import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import { User } from "@/interfaces/user";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import CheckIcon from "@mui/icons-material/Check";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ErrorHandler, SuccessHandler } from "@/helper/Handler";
import CircleIcon from "@mui/icons-material/Circle";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const Register = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        uppercase: false,
        number: false,
        specialChar: false,
    });
    const router = useRouter();

    const API = process.env.NEXT_PUBLIC_API_BASE_URL;

    const handleToggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword((prev) => !prev);
    };
    const validatePassword = (password: string) => {
        const criteria = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setPasswordCriteria(criteria);

        const allCriteriaMet = Object.values(criteria).every(
            (value) => value === true
        );
        setIsPasswordValid(allCriteriaMet);
    };
    const handleRegister = async (values: User) => {
        try {
            setLoading(true);

            const res = await fetch(`${API}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                dispatch(setUser(data.user));
                SuccessHandler({
                    message: "Registration successful!",
                });
                console.log(data, 'data')

                if (data.user.role === "ADMIN") {
                    router.push("/dashboard/admin");
                } else {
                    router.push("/dashboard/customer");
                }
            } else {
                const errorData = await res.json();
                console.log(errorData, 'error')
                ErrorHandler({
                    message: errorData.message || "Registration failed.",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            ErrorHandler({ message: "Registration failed" });
        } finally {
            setLoading(false);
        }
    };
    return (
        <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleRegister(values);
            }}
        >
            {(formik) => (
                <Form>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <label
                            htmlFor="name"
                            style={{
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                                color: "#374151",
                            }}
                        >
                            Name
                        </label>
                        <Input
                            name="name"
                            placeholder="Enter your name"
                            onChange={formik.handleChange}
                        />
                        <label
                            htmlFor="email"
                            style={{
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                                color: "#374151",
                            }}
                        >
                            Email
                        </label>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            onChange={formik.handleChange}
                        />
                        <label
                            htmlFor="password"
                            style={{
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                                color: "#374151",
                            }}
                        >
                            Password
                        </label>
                        <Input
                            name="password"
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Create a password"
                            endadornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={handleToggleCurrentPasswordVisibility}>
                                        {showCurrentPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}{" "}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const { value } = event.target;
                                formik.setFieldValue("password", value);
                                validatePassword(value);
                            }}
                        />
                        {/* Password Criteria */}
                        <Box sx={{ mt: 2 }}>
                            <Typography
                                sx={{
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    lineHeight: "100%",
                                    letterSpacing: "0%",
                                    color: "#4B5563",
                                    margin: "0.5rem 0",
                                }}
                            >
                                Password must contain
                            </Typography>
                            <ul style={{ listStyleType: "none" }}>
                                {Object.entries(passwordCriteria).map(([key, isValid]) => (
                                    <li
                                        key={key}
                                        style={{
                                            fontWeight: "400",
                                            fontSize: "14px",
                                            lineHeight: "100%",
                                            padding: "0.5rem 0",
                                            letterSpacing: "0%",
                                            display: "flex",
                                            alignItems: "center",
                                            color: isValid ? "#059669" : "#9CA3AF",
                                        }}
                                    >
                                        {isValid ? (
                                            <CheckIcon
                                                sx={{
                                                    color: "#059669",
                                                    mr: 1,
                                                    fontSize: "medium",
                                                }}
                                            />
                                        ) : (
                                            <CircleIcon
                                                sx={{
                                                    color: "#9CA3AF",
                                                    mr: 1,
                                                    fontSize: "small",
                                                }}
                                            />
                                        )}
                                        {key === "length" && "At least 8 characters"}
                                        {key === "uppercase" && "At least 1 uppercase letter"}
                                        {key === "number" && "At least 1 number"}
                                        {key === "specialChar" && "At least 1 special character"}
                                    </li>
                                ))}
                            </ul>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                mt: "2rem",
                                width: "100%",
                            }}
                        >
                            <Button
                                variant="contained"
                                type="submit"
                                disabled={!isPasswordValid || loading}
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    borderRadius: "0.5rem",
                                    width: "100%",
                                    background: "#408CFF",
                                }}
                            >
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default Register;
