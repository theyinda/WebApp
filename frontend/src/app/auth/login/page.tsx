import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input";
import Button from "@mui/material/Button";
import { User } from "@/interfaces/user";
import { Box, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ErrorHandler, SuccessHandler } from "@/helper/Handler";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const Login = () => {
    const dispatch = useDispatch();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleToggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword((prev) => !prev);
    };
    const API = process.env.NEXT_PUBLIC_API_BASE_URL;


    const handleLogin = async (values: User) => {
        try {
            setLoading(true);
            const res = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),
            });
            console.log(res, 'res')

            if (res.ok) {
                const data = await res.json();
                dispatch(setUser(data.user));
                SuccessHandler({
                    message: "Login successful!",
                });
                console.log(data, 'data')

                if (data.user.role === "ADMIN") {
                    router.push("/dashboard/admin");
                } else {
                    router.push("/dashboard/customer");
                }
            } else if (res.status === 401) {
                ErrorHandler({
                    message: "User not found or Invalid credentials",
                });
            }
            else {
                ErrorHandler({
                    message: "Login Unsuccessful, please check your details",
                });
            }

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleLogin(values);
            }}
        >
            {(formik) => (
                <Form>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
                            placeholder="Enter your password"
                            endadornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleToggleCurrentPasswordVisibility}
                                    >
                                        {showCurrentPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}{" "}
                                    </IconButton>
                                </InputAdornment>
                            }
                            onChange={formik.handleChange}
                        />
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
                                color="primary"
                                type="submit"
                                loading={loading}
                                sx={{
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    borderRadius: "0.5rem",
                                    width: "100%",
                                    background: '#408CFF'
                                }}
                            >Login</Button>
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
