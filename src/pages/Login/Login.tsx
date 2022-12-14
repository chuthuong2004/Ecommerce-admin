import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FacebookIcon, GoogleIcon, LeftIcon, LogoIcon } from '../../components/Icons';
import styles from './Login.module.scss';
import config from '../../config';
import { useState, useEffect, useCallback, FocusEvent } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  useForgotPasswordMutation,
  useLoginUserMutation,
  useLoginWithGoogleMutation,
  useRegisterUserMutation,
} from '../../services/authApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCredentials } from '../../features/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

const cx = classNames.bind(styles);

export type InputAuth = {
  email: string;
  password?: string;
  phone?: string;
};
const initialState: InputAuth = {
  email: '',
  password: '',
  phone: '',
};
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { from } = location.state || { from: { pathname: '/' } };
  const [formValue, setFormValue] = useState(initialState);
  const [activeSignup, setActiveSignup] = useState(false);
  const [errorInput, setErrorInput] = useState<InputAuth>(initialState);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [
    loginUser,
    {
      data: loginData,
      isLoading: isLoadingLogin,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const [
    registerUser,
    {
      data: registerData,
      isLoading: isLoadingRegister,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();
  const [
    forgotPassword,
    {
      data: dataForgotPassword,
      isLoading: isLoadingForgotPassword,
      isSuccess: isSuccessForgotPassword,
      isError: isErrorForgotPassword,
      error: errorForgotPassword,
    },
  ] = useForgotPasswordMutation();

  useEffect(() => {
    location.pathname === config.routes.login ? setActiveSignup(false) : setActiveSignup(true);
    setFormValue(initialState);
    setErrorInput(initialState);
  }, [location.pathname, openForgotPassword]);
  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue({
        ...formValue,
        [e.target.name]: e.target.value,
      });
    },
    [formValue],
  );
  const checkInputEmpty = (data: InputAuth) => {
    setErrorInput({
      email: !data.email ? 'Vui l??ng nh???p email.' : '',
      password: !data.password
        ? 'Vui l??ng nh???p m???t kh???u.'
        : data.password && data.password.length < 6
        ? 'M???t kh???u ph???i c?? ??t nh???t 6 k?? t???.'
        : '',
      phone: !data.phone ? 'Vui l??ng nh???p s??? ??i???n tho???i.' : '',
    });
  };
  const handleLogin = async () => {
    if (formValue.email && formValue.password && formValue.password.length >= 6) {
      await loginUser({ email: formValue.email, password: formValue.password });
    }
    checkInputEmpty(formValue);
  };
  const handleRegister = async () => {
    if (
      formValue.email &&
      formValue.phone &&
      formValue.password &&
      formValue.password.length >= 6
    ) {
      await registerUser({
        email: formValue.email,
        password: formValue.password,
        phone: formValue.phone,
      });
    }
    checkInputEmpty(formValue);
  };
  const handleForgotPassword = async () => {
    if (formValue.email) {
      await forgotPassword({
        email: formValue.email,
      });
    }
    checkInputEmpty(formValue);
  };
  const handleSubmit = () => {
    if (location.pathname === config.routes.login) {
      handleLogin();
    } else {
      handleRegister();
    }
  };
  useEffect(() => {
    if (isLoginSuccess) {
      if (loginData) {
        // if (loginData.isAdmin) {
        const { accessToken, refreshToken, ...user } = loginData;
        dispatch(setCredentials({ user: { ...user }, token: { accessToken, refreshToken } }));
        toast.success('????ng nh???p th??nh c??ng !');
        navigate(from.pathname);
        // } else {
        //   toast.error('Vui l??ng ????ng nh???p v???i admin!');
        // }
      }
    }

    if (isLoginError) {
      toast.error((loginError as any).data.message, {
        position: 'top-right',
      });
    }
    if (isRegisterSuccess && activeSignup) {
      toast.success(registerData.message);
      setFormValue(initialState);
      navigate(config.routes.login);
    }
    if (isRegisterError) {
      toast.error((registerError as any).data.message, {
        position: 'top-right',
      });
    }
  }, [isLoadingLogin, isLoadingRegister]);
  useEffect(() => {
    isSuccessForgotPassword && toast.info(dataForgotPassword.message);
    isErrorForgotPassword && toast.error((errorForgotPassword as any).data.message);
  }, [isLoadingForgotPassword]);
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setErrorInput({
      ...errorInput,
      [e.target.name]: e.target.value
        ? e.target.name === 'password'
          ? e.target.value.length < 6 && 'M???t kh???u ph???i c?? ??t nh???t 6 k?? t???.'
          : ''
        : 'Tr?????ng n??y l?? b???t bu???c.!!!',
    });
  };

  return (
    <section className={cx('login-section')}>
      <div className={cx('container')}>
        <div className={cx('wrapper')}>
          <div className={cx('col-lg')}>
            <div className={cx('customer-actions__greeting')}>
              <div className={cx('logo')}>
                <Link to={config.routes.home}>
                  <LogoIcon />
                </Link>
              </div>
              <h1>
                <span>Xin ch??o </span>Qu?? kh??ch
              </h1>
            </div>
          </div>
          <div className={cx('col-lg')}>
            <div className={cx('customer-actions__wrapper')}>
              <div className={cx('customer-actions__form', openForgotPassword && 'show')}>
                <div className={cx('login-n-signup')}>
                  <div className={cx('nav-links', activeSignup ? 'sign-up' : 'sign-in')}>
                    <Link
                      to={config.routes.login}
                      className={cx('nav-link', !activeSignup && 'active')}
                    >
                      ????ng nh???p
                    </Link>
                    <Link
                      to={config.routes.register}
                      className={cx('nav-link', activeSignup && 'active')}
                    >
                      ????ng k??
                    </Link>

                    <div className={cx('line')}></div>
                  </div>
                  <div className={cx('customer-login')}>
                    {activeSignup ? (
                      <>
                        <div className={cx('form-desc')}>
                          M???t kh???u ph???i c?? ??t nh???t 8 k?? t???, bao g???m ch??? v?? s???, kh??ng bao g???m k?? t???
                          ?????c bi???t.
                        </div>
                        <Input
                          label="email"
                          type="email"
                          name="email"
                          onChange={handleChangeInput}
                          value={formValue.email}
                          error={errorInput}
                          onBlur={handleBlur}
                        />
                        <Input
                          label="m???t kh???u"
                          type="password"
                          name="password"
                          onChange={handleChangeInput}
                          value={formValue.password}
                          error={errorInput}
                          onBlur={handleBlur}
                        />
                        <Input
                          label="s??? ??i???n tho???i"
                          name="phone"
                          onChange={handleChangeInput}
                          value={formValue.phone}
                          error={errorInput}
                          onBlur={handleBlur}
                        />
                      </>
                    ) : (
                      <>
                        <Input
                          label="email"
                          type="email"
                          name="email"
                          onChange={handleChangeInput}
                          value={formValue.email}
                          error={errorInput}
                          onBlur={handleBlur}
                        />
                        <Input
                          label="m???t kh???u"
                          type="password"
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChangeInput}
                          value={formValue.password}
                          error={errorInput}
                        />
                      </>
                    )}
                    <Input type="checkbox" label="L??u th??ng tin ????ng nh???p" />
                    {activeSignup && (
                      <>
                        <Input type="checkbox" label="????ng k?? nh???n th??ng tin khuy???n m??i" />
                        <div className={cx('form-desc')}>
                          B???ng c??ch t???o t??i kho???n ??? Maison l?? b???n ?????ng ?? v???i c??c{' '}
                          <span>Ch??nh s??ch B???o m???t v?? ??i???u kho???n - ??i???u ki???n.</span>
                        </div>
                      </>
                    )}
                    <Button onClick={handleSubmit} className={cx('btn-action')} large primary>
                      {isLoadingRegister || isLoadingLogin ? (
                        <ReactLoading
                          type="spinningBubbles"
                          color="#ffffff"
                          width={20}
                          height={20}
                        />
                      ) : activeSignup ? (
                        'T???o t??i kho???n'
                      ) : (
                        '????ng nh???p'
                      )}
                    </Button>

                    {!activeSignup && (
                      <div className={cx('redirect-form')}>
                        <span
                          onClick={() => setOpenForgotPassword(true)}
                          className={cx('redirect-btn')}
                        >
                          Qu??n m???t kh???u?
                        </span>
                      </div>
                    )}
                    <div className={cx('input-line')}></div>
                  </div>
                  <div className={cx('login-n-signup__socials')}>
                    <div className={cx('btn')}>
                      <Button
                        className={cx('btn__facebook')}
                        large
                        primary
                        icon={<FacebookIcon width="18" height="18" />}
                      >
                        ????ng nh???p b???ng facebook
                      </Button>
                    </div>
                    <div className={cx('btn')}>
                      <Button
                        className={cx('btn__google')}
                        large
                        primary
                        icon={<GoogleIcon width="18" height="18" />}
                      >
                        ????ng nh???p v???i Google
                      </Button>
                    </div>
                  </div>
                </div>
                <div className={cx('forgot-password')}>
                  <div className={cx('forgot-password__top')}>
                    <h3 className={cx('form-title')}>Qu??n m???t kh???u</h3>
                    <div className={cx('form-desc')}>
                      Vui l??ng nh???p email c???a b???n ??? ????y ????? nh???n h?????ng d???n ?????t l???i m???t kh???u.
                    </div>
                    <Input
                      label="email"
                      type="email"
                      name="email"
                      error={errorInput}
                      onChange={handleChangeInput}
                      onBlur={handleBlur}
                      value={formValue.email}
                    />
                    <div className={cx('btn')}>
                      <Button onClick={handleForgotPassword} large primary>
                        {isLoadingForgotPassword ? (
                          <ReactLoading
                            type="spinningBubbles"
                            color="#ffffff"
                            width={20}
                            height={20}
                          />
                        ) : (
                          'X??c th???c email'
                        )}
                      </Button>
                    </div>
                    <div className={cx('btn', 'btn-forgot')}>
                      <Button
                        onClick={() => setOpenForgotPassword(false)}
                        leftIcon={<LeftIcon />}
                        large
                      >
                        tr??? v??? ????ng nh???p
                      </Button>
                    </div>
                  </div>
                  <div className={cx('register-now')}>
                    B???n ch??a c?? t??i kho???n ?{' '}
                    <Link to={config.routes.register} onClick={() => setOpenForgotPassword(false)}>
                      T???o ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
