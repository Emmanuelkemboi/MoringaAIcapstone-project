import { useState } from 'react'
import './App.css'
function App() {
  const [isAccount, setIsAccount] = useState(false); // false -> show SignUp initially per README
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [focused, setFocused] = useState({ username: false, password: false, confirmPassword: false });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState(''); // app-level messages (login/signup feedback)

  const validate = (data, forSignup = false) => {
    const e = {};
    if (!data.username.trim()) e.username = 'Username is required';
    if (data.username && data.username.length < 3) e.username = 'At least 3 characters';
    if (!data.password) e.password = 'Password is required';
    if (data.password && data.password.length < 6) e.password = 'At least 6 characters';
    if (forSignup) {
      if (!data.confirmPassword) e.confirmPassword = 'Please confirm your password';
      if (data.password && data.confirmPassword && data.password !== data.confirmPassword) e.confirmPassword = 'Passwords do not match';
    }
    return e;
  };

  const resetForm = (keepUsername = false) => {
    setFormData({
      username: keepUsername ? formData.username : '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setSuccess(false);
    setMessage('');
    setShowPassword(false);
    setFocused({ username: false, password: false, confirmPassword: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate(formData, !isAccount); // if not isAccount => signup flow
    setErrors(v);
    if (Object.keys(v).length) return;
    setLoading(true);
    setSuccess(false);
    setMessage('');
    // simulate async auth
    setTimeout(() => {
      setLoading(false);
      if (isAccount) {
        // Login success
        setSuccess(true);
        setMessage(`Welcome back, ${formData.username}!`);
        console.log('Logged in:', formData);
      } else {
        // Signup success -> after signing up we can switch to login view
        setSuccess(true);
        setMessage(`Account created for ${formData.username}. You can now log in.`);
        console.log('Signed up:', formData);
        // Optionally switch to login view after signup
        // setIsAccount(true);
        // resetForm(true);
      }
    }, 900);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // live validation for that field
    setErrors(prev => {
      const next = { ...prev };
      const fieldErrs = validate({ ...formData, [name]: value }, !isAccount);
      if (fieldErrs[name]) next[name] = fieldErrs[name];
      else delete next[name];
      return next;
    });
  };

  const handleFocus = (field) => setFocused(f => ({ ...f, [field]: true }));
  const handleBlur = (field) => setFocused(f => ({ ...f, [field]: false }));

  // Toggle between Login and Signup and reset form state appropriately
  const toggleAccount = () => {
    setIsAccount(a => {
      const next = !a;
      // reset fields but keep username for convenience when switching
      resetForm(true);
      setMessage('');
      setErrors({});
      return next;
    });
  };

  return (
    <div className="App">
      <style>{`
        .login-card{
          width: 360px;
          margin: 48px auto;
          padding: 28px;
          border-radius: 12px;
          background: linear-gradient(135deg,#0f172a 0%, #001219 100%);
          color: #e6eef8;
          box-shadow: 0 10px 30px rgba(2,6,23,0.6);
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }
        .brand { text-align:center; margin-bottom:18px; }
        .brand h1{ margin:0; font-size:20px; letter-spacing:0.6px; color:#9be7ff;}
        .field{
          position:relative;
          margin:14px 0;
        }
        .input{
          width:100%;
          padding:14px 44px 14px 14px;
          border-radius:8px;
          border:1px solid rgba(255,255,255,0.08);
          background:rgba(255,255,255,0.03);
          color:inherit;
          outline:none;
          transition: box-shadow .18s, border-color .18s, transform .12s;
        }
        .input:focus{ box-shadow: 0 6px 20px rgba(9,150,255,0.12); border-color:#09f;}
        label.floating{
          position:absolute;
          left:12px;
          top:50%;
          transform:translateY(-50%);
          pointer-events:none;
          font-size:13px;
          color:rgba(255,255,255,0.6);
          transition: all .15s ease;
        }
        .field.focused label.floating,
        .field.filled label.floating {
          top:6px;
          font-size:11px;
          color:#9be7ff;
        }
        .hint{
          font-size:12px;
          margin-top:6px;
          color:rgba(255,255,255,0.6);
        }
        .error{
          color:#ffb4b4;
          font-size:12px;
          margin-top:6px;
        }
        .actions{
          display:flex;
          align-items:center;
          justify-content:space-between;
          margin-top:18px;
        }
        .btn{
          background:linear-gradient(90deg,#06b6d4,#0ea5e9);
          color:#012;
          padding:10px 16px;
          border-radius:10px;
          border:none;
          cursor:pointer;
          font-weight:600;
          display:inline-flex;
          align-items:center;
          gap:10px;
          transition: transform .12s ease, opacity .12s;
        }
        .btn:active{ transform:translateY(1px); }
        .btn[disabled]{ opacity:0.7; cursor:not-allowed; }
        .toggle{
          background:transparent;
          border:1px solid rgba(255,255,255,0.06);
          color:inherit;
          padding:8px 10px;
          border-radius:8px;
          cursor:pointer;
        }
        .success{
          margin-top:12px;
          color:#9be7ff;
          font-size:13px;
          text-align:center;
        }
        .right-controls{ display:flex; gap:8px; align-items:center;}
        .spinner{
          width:16px; height:16px; border-radius:50%;
          border:2px solid rgba(255,255,255,0.18);
          border-top-color:rgba(255,255,255,0.9);
          animation:spin .9s linear infinite;
        }
        .switch-link{
          background:transparent;
          border:none;
          color:#9be7ff;
          text-decoration:underline;
          cursor:pointer;
          font-size:13px;
        }
        @keyframes spin{ to{ transform:rotate(360deg); } }
      `}</style>

      <div className="login-card" role="region" aria-label={isAccount ? "Login form" : "Sign up form"}>
        <div className="brand">
          <h1>{isAccount ? 'Welcome back' : 'Create your account'}</h1>
          <div className="hint">{isAccount ? 'Sign in to continue to your dashboard' : 'Join us — it only takes a moment'}</div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className={`field ${focused.username || formData.username ? 'focused filled' : ''}`}>
            <label className="floating" htmlFor="username">Username</label>
            <input
              className="input"
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              onFocus={() => handleFocus('username')}
              onBlur={() => handleBlur('username')}
              placeholder=" "
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'u-err' : undefined}
            />
            {errors.username ? <div id="u-err" className="error">{errors.username}</div> : null}
          </div>

          <div className={`field ${focused.password || formData.password ? 'focused filled' : ''}`}>
            <label className="floating" htmlFor="password">{isAccount ? 'Password' : 'Password (min 6 chars)'}</label>
            <div style={{ position: 'relative' }}>
              <input
                className="input"
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                placeholder=" "
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'p-err' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                className="toggle"
                aria-pressed={showPassword}
                style={{ position: 'absolute', right: 6, top: 6 }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password ? <div id="p-err" className="error">{errors.password}</div> : <div className="hint">Use at least 6 characters</div>}
          </div>

          {/* Confirm password only for signup */}
          {!isAccount && (
            <div className={`field ${focused.confirmPassword || formData.confirmPassword ? 'focused filled' : ''}`}>
              <label className="floating" htmlFor="confirmPassword">Confirm password</label>
              <input
                className="input"
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => handleFocus('confirmPassword')}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder=" "
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'cp-err' : undefined}
              />
              {errors.confirmPassword ? <div id="cp-err" className="error">{errors.confirmPassword}</div> : null}
            </div>
          )}

          <div className="actions">
            <div className="right-controls">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                <input
                  type="checkbox"
                  name="remember"
                  onChange={() => {}}
                  aria-label="Remember me"
                />
                Remember
              </label>
            </div>

            <button className="btn" type="submit" disabled={loading}>
              {loading ? <span className="spinner" aria-hidden="true" /> : 'Login'}
              {loading ? 'Signing in' : 'Sign in'}
            </button>
          </div>

          {success && <div className="success" role="status">Successfully signed in ✓</div>}
        </form>
      </div>
    </div>
  )
}

export default App
