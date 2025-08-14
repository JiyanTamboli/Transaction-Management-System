import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [Pass, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertVariant, setAlertVariant] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (username === 'admin' && Pass === '1234') ||
      (username === 'Tejas' && Pass === '#Tejas1332003')
    ) {
      setAlertMsg('Login successful');
      setAlertVariant('success');
      setShowAlert(true);

      setTimeout(() => {
        setIsLoggedIn(true);
        navigate('/Home');
      }, 1500);
    } else {
      setAlertMsg('Invalid username or password');
      setAlertVariant('danger');
      setShowAlert(true);
    }
  };

  return (
    <div className="wrapper d-flex justify-content-center align-items-center min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Form className="login-form p-4 shadow rounded" onSubmit={handleSubmit}>
              <h1 className="text-center mb-4">Login</h1>

              {showAlert && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                  {alertMsg}
                </Alert>
              )}

              <Form.Group className="mb-3 input-box" controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={handleInputChange}
                />
                <i className="bx bxs-user"></i>
              </Form.Group>

              <Form.Group className="mb-3 input-box position-relative" controlId="formPassword">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  required
                  value={Pass}
                  onChange={handlePasswordChange}
                />
                <i
                  className={`bx ${showPassword ? 'bx-show' : 'bx-hide'} eye-icon`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                ></i>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-3 remember-forgot">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="#">Forgot password?</a>
              </div>

              <Button variant="primary" type="submit" className="w-100 btn">
                Login
              </Button>

              <div className="text-center mt-3 register-link">
                <p>Don't have an account? <a href="#">Register</a></p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
