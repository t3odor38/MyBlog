class UserController {
    constructor(userView, requester, baseUrl, appKey) {
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/"+ appKey + "/";
    }

    showLoginPage(isLoggedIn){
        this._userView.showLoginPage(isLoggedIn);
    }

    showRegisterPage(isLoggedIn){
        this._userView.showRegisterPage(isLoggedIn);
    }

    register(data){
        if(data.username.length < 6){
            showPopup('error', 'Username too short!');
            return;
        }
        if(data.fullname.length < 4){
            showPopup('error', 'Enter First and Last name');
            return;
        }
        if(data.password != data.confirmPassword){
            showPopup('error', 'Password doesn\'t match');
            return;
        }
        if(data.password.length < 5){
            showPopup('error', 'Password too short');
            return;
        }

        delete data['confirmPassword'];

        this._requester.post(this._baseServiceUrl, data,
        function successCallBack(response) {
            showPopup('success', 'Registration successfull.');
            redirectUrl('#/login');
        },
        function errorCallBack(response) {
            showPopup('error', 'Error')
        })
    }

    login(data) {
        let requestUrl = this._baseServiceUrl + "login";
        this._requester.post(requestUrl, data,
            function successCallBack(response) {
                sessionStorage.setItem('username', response.username);
                sessionStorage.setItem('_authToken', response._kmd.authtoken);
                sessionStorage.setItem('fullname', response.fullname);
                showPopup('success', 'Login successful');
                redirectUrl('#/');
            },
            function errorCallBack(response) {
                showPopup('error', 'Incorrect Login');
            });
    }

    logout(data){
        sessionStorage.clear(data);
        redirectUrl('#/')
    }
}