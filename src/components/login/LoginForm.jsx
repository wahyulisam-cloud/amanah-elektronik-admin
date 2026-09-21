import { FaUser, FaLock } from "react-icons/fa";

function LoginForm({
  form,
  handleChange,
  handleSubmit,
  loading,
  error,
}) {
  return (
    <div className="login-container">
      <div className="login-card">

        {/* Logo / Brand */}
        <div className="login-brand">
          <div className="login-logo">
            <span>A</span>
          </div>

          <div className="login-brand-text">
            <h1>Amanah Elektronik</h1>
            <p>Rental Elektronik Terpercaya</p>
          </div>
        </div>

        {/* Header */}
        <div className="login-header">
          <h2>Selamat Datang</h2>

          <p>
            Silakan masuk untuk mengakses dashboard admin.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="login-input-group">
            <label htmlFor="username">
              Username
            </label>

            <div className="login-input-box">
              <FaUser className="login-input-icon" />

              <input
                id="username"
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                autoComplete="username"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-input-group">
            <label htmlFor="password">
              Password
            </label>

            <div className="login-input-box">
              <FaLock className="login-input-icon" />

              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-spinner"></span>
                Memproses...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

        {/* Footer */}
        <div className="login-footer">
          <span>© {new Date().getFullYear()} Amanah Elektronik</span>
        </div>

      </div>
    </div>
  );
}

export default LoginForm;