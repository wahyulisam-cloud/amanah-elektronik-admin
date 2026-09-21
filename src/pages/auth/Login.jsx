import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import "../../assets/css/Login.css";
import LoginForm from "../../components/login/LoginForm";

import { login } from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = await login(form.username, form.password);

      console.log("Response Login:", data);

      localStorage.setItem("token", data.token);

      Swal.fire({
        title: "Berhasil!",
        text: "Login berhasil. Selamat datang!",
        icon: "success",
        confirmButtonColor: "#0879D1",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.log(err);

      const pesan =
        err.response?.data?.message || "Username atau password salah";

      setError(pesan);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <LoginForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </main>
  );
}

export default Login;