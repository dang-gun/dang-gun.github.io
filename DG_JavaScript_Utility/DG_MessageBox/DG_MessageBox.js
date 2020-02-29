/** DG_Popup을 활용한 메시지박스  */
var DG_MessageBox = {};

/** 사용할 div */
DG_MessageBox.divMessageBox = null;

/** 선택된 버튼의 타입 */
DG_MessageBox.ButtonShowType = {
    None: 0,
    Ok: 1,
    OkCancel: 2,
    Cancel: 3,
    YesNo: 4
};

DG_MessageBox.ButtonType = {
    None: 0,
    Ok: 1,
    Cancel: 2,
    Yes: 3,
    No: 4
};

DG_MessageBox.BigIconType = {
    None: 0,
    Info: 1,
    Warning: 2,
    Error: 3,
    Question: 4,
    Success: 5,
    Help: 6
};



/** 창열기 기본 옵션 */
DG_MessageBox.ShowOptionDefault = {
    //제목
    Title: "",
    //내용
    Content: "",

    //큰 아이콘 타입
    BigIconType: DG_MessageBox.BigIconType.None,

    //버튼 타입
    ButtonShowType: DG_MessageBox.ButtonShowType.Ok,


    //버튼 이벤트
    //function (DG_MessageBox.ButtonType)
    //DG_MessageBox.ButtonType : 클릭된 버튼 정보
    ButtonEvent: null,

    //컨탠츠에 적용할 css
    ContentCss: "DG_MessageBoxContentCss"
};



/**
 * DG_JQuery_Popup를 초기화 한다.
 * @param {json} jsonShowOptionDefault 기본 옵션으로 사용할 옵션
 */
DG_MessageBox.Initialize = function (jsonShowOptionDefault)
{
    /** DG_Popup 생성 */
    DG_Popup.Initialize();

    //기본 옵션
    var jsonOpt = Object.assign(DG_MessageBox.ShowOptionDefault
                                , jsonShowOptionDefault);
    DG_MessageBox.ShowOptionDefault = jsonOpt;
};


/**
 * 미리 만들어진 메시지 박스를 출력한다.
 * @param {json} jsonOption 추가 옵션
 */
DG_MessageBox.Show = function (jsonOption)
{
    //완성된 옵션
    var jsonOpt = Object.assign(DG_MessageBox.ShowOptionDefault, jsonOption);
    
    var jsonOutput = {
        /** 시작위치 - Y */
        top: jsonOpt.top,
        /** 시작위치 - X */
        left: jsonOpt.left,

        //제목
        Title: jsonOpt.Title,
        //내용
        Content: jsonOpt.Content,

        //버튼 정보 배열
        //ButtonCss : 추가할 css
        //ButtonType : 버튼의 타입, DG_MessageBox.ButtonType
        //ButtonText : 표시할 텍스트
        Buttons: [],

        //버튼 이벤트
        //function (DG_MessageBox.ButtonType)
        //DG_MessageBox.ButtonType : 클릭된 버튼 정보
        ButtonEvent: jsonOpt.ButtonEvent,

        //컨탠츠에 적용할 css
        ContentCss: jsonOpt.ContentCss
    };

    //큰 아이콘 타입
    switch (jsonOpt.BigIconType)
    {
        case DG_MessageBox.BigIconType.Info:
            jsonOutput.BigIconCss = "DG_MessageBoxBigIcon_info";
            break;
        case DG_MessageBox.BigIconType.Warning:
            jsonOutput.BigIconCss = "DG_MessageBoxBigIcon_Warning";
            break;
        case DG_MessageBox.BigIconType.Error:
            jsonOutput.BigIconCss = "DG_MessageBoxBigIcon_Error";
            break;
        case DG_MessageBox.BigIconType.Question:
            jsonOutput.BigIconCss = "DG_MessageBoxBigIcon_Question";
            break;
        case DG_MessageBox.BigIconType.Success:
            jsonOutput.BigIconCss = "DG_MessageBoxBigIcon_Success";
            break;
        case DG_MessageBox.BigIconType.Help:
            jsonOutput.BigIconCss = "DG_MessageBoxBigIcon_Help";
            break;
    }
    
    //표시 버튼 타입
    switch (jsonOpt.ButtonShowType)
    {
        case DG_MessageBox.ButtonShowType.OkCancel:
            jsonOutput.Buttons.push({
                ButtonCss: "BtnBlue",
                ButtonType: DG_MessageBox.ButtonType.Ok,
                ButtonText: "OK"
            });

            jsonOutput.Buttons.push({
                ButtonCss: "BtnRed",
                ButtonType: DG_MessageBox.ButtonType.Cancel,
                ButtonText: "Cancel"
            });
            break;
        case DG_MessageBox.ButtonShowType.Cancel:
            jsonOutput.Buttons.push({
                ButtonCss: "BtnRed",
                ButtonType: DG_MessageBox.ButtonType.Cancel,
                ButtonText: "Cancel"
            });
            break;
        case DG_MessageBox.ButtonShowType.YesNo:
            jsonOutput.Buttons.push({
                ButtonCss: "BtnLlightGreen",
                ButtonType: DG_MessageBox.ButtonType.Yes,
                ButtonText: "Yes"
            });

            jsonOutput.Buttons.push({
                ButtonCss: "BtnOrange",
                ButtonType: DG_MessageBox.ButtonType.No,
                ButtonText: "No"
            });
            break;

        case DG_MessageBox.ButtonShowType.Ok:
        default:
            jsonOutput.Buttons.push({
                ButtonCss: "BtnBlue",
                ButtonType: DG_MessageBox.ButtonType.Ok,
                ButtonText: "OK"
            });
            break;
    }

    DG_MessageBox.ShowBox(jsonOutput);
};


/**
 * 메시지 박스를 표시한다.
 * @param {json} jsonOption 창옵션
 */
DG_MessageBox.ShowBox = function (jsonOption)
{
    var jsonOptDefault = {
        //제목
        Title: "",
        //내용
        Content: "",

        //큰 아이콘으로 사용할 css
        BigIconCss: "",

        //버튼 정보 배열
        //ButtonCss : 추가할 css
        //ButtonType : 버튼의 타입, DG_MessageBox.ButtonType
        //ButtonText : 표시할 텍스트
        Buttons: [],


        //버튼 이벤트
        //function (DG_MessageBox.ButtonType)
        //DG_MessageBox.ButtonType : 클릭된 버튼 정보
        ButtonEvent: null,

        //컨탠츠에 적용할 css
        ContentCss: "DG_MessageBoxContentCss"
    };

    //완성된 옵션
    var jsonOpt = Object.assign(jsonOptDefault, jsonOption);

    //
    var jsonTossOpt = {
        /** 시작위치 - Y */
        top: jsonOpt.top,
        /** 시작위치 - X */
        left: jsonOpt.left,

        /** 팝업 안에 표시할 컨탠츠
         * 오브젝트도 가능하다. */
        Content: ""
    };



    //오브젝트를 추가할 비어 있는 개체
    var divHtml = $(document.createDocumentFragment());

    //타이틀
    var divTitle = $("<div class='DG_PopupTitle DG_MessageBoxTitle'>" + jsonOpt.Title + "</div>");

    //컨탠츠
    var divContent = $("<div class='DG_MessageBoxContent'></div>");

    //컨탠츠 - 큰 아이콘 *******************
    var divBigIcon = $("<div></div>");

    if (jsonOpt.BigIconCss)
    {//내용물이 있으면
        divBigIcon.addClass(jsonOpt.BigIconCss);
    }
    else
    {//없으면
    }

    //큰 아이콘 삽입
    divContent.append(divBigIcon);


    //컨탠츠 - html 내용****************************
    var divContentHtml = $("<div class='DG_MessageBoxContentHtml'></div>");
    divContentHtml.html(jsonOpt.Content);
    divContent.append(divContentHtml);
    

    //푸터****************************************
    var divFooter = $("<div class='DG_MessageBoxFooter'></div>");

    //버튼 추가
    for (var i = 0; i < jsonOpt.Buttons.length; ++i)
    {
        //선택된 버튼
        var itemBtn = jsonOpt.Buttons[i];

        //추가할버튼
        var btn01 = $("<button></button>");
        btn01.addClass(itemBtn.ButtonCss);
        btn01.html(itemBtn.ButtonText);
        btn01.click(function ()
        {
            jsonOpt.ButtonEvent(itemBtn.ButtonType);
        });

        divFooter.append(btn01);
    }


    //html 완성하기
    divHtml.append(divTitle);
    divHtml.append(divContent);
    divHtml.append(divFooter);

    jsonTossOpt.Content = divHtml;

    DG_Popup.Show(jsonTossOpt);
};