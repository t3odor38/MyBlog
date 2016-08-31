class PostController {
    constructor(postView, requester, baseUrl, appKey) {
        this._postView = postView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/appdata/" + appKey + "/posts";
    }

    showCreatePostPage(data, isLoggedIn){
        this._postView.showCreatePostPage(data, isLoggedIn);
    }

    createNewPost(requestData){
        if(requestData.title.length < 5){
            showPopup('error', 'Title is too short');
            return;
        }

        if(requestData.content.length <50){
            showPopup('error', 'Post content is too short');
            return;
        }
        this._requester.post(this._baseServiceUrl, requestData, function (data) {
            showPopup ('success', 'Creation succesful');
            redirectUrl('#/')
        }, function (data) {
            showPopup('error', 'Something went wrong')
            }

        )
    }
}