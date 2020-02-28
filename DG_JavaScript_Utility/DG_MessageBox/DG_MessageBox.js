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
    Ok: 0,
    Cancel: 1,
    Yes:2,
    No: 3
};

DG_MessageBox.BigIconType = {
    None: 0,
    Info: 1,
    Warning: 2,
    Error: 3
};


/**
 * DG_JQuery_Popup를 초기화 한다.
 */
DG_MessageBox.Initialize = function ()
{
    /** DG_Popup 생성 */
    DG_Popup.Initialize();

};

/**
 * 메시지 박스를 표시한다.
 * @param {json} jsonOption 창옵션
 */
DG_MessageBox.Show = function (jsonOption)
{
    var jsonOptDefault = {
        //제목
        Title: "",
        //내용
        Content: "",

        //버튼 타입
        ButtonType: DG_MessageBox.ButtonShowType.Ok,
        //큰 아이콘 타입
        BigIconType: DG_MessageBox.BigIconType.None,

        //버튼 이벤트
        //function (DG_MessageBox.ButtonType)
        //DG_MessageBox.ButtonType : 클릭된 버튼 정보
        ButtonEvent: null,

        //컨탠츠에 적용할 css
        ContentCss: "DG_MessageBoxContentCss"
    };

    //완성된 오브젝트
    var jsonOpt = Object.assign(jsonOptDefault, jsonOption);

    //오브젝트를 추가할 비어 있는 개체
    var divHtml = $(document.createDocumentFragment());

    //타이틀
    var divTitle = $("<div class='DG_PopupTitle DG_MessageBoxTitle'>" + jsonOpt.Title + "</div>");

    //컨탠츠
    var divContent = $("<div class='DG_MessageBoxContent'></div>");
    //컨탠츠 - 큰 아이콘
    switch (jsonOpt.BigIconType)
    {
        case DG_MessageBox.BigIconType.Info:
            divContent.append("<div class='DG_MessageBoxBigIcon_info'></div>");
            break;
        case DG_MessageBox.BigIconType.Warning:
            divContent.append("<div class='DG_MessageBoxBigIcon_Warning'></div>");
            break;
        case DG_MessageBox.BigIconType.Error:
            divContent.append("<div class='DG_MessageBoxBigIcon_Error'></div>");
            break;
    }

    //컨탠츠 - html 내용
    var divContentHtml = $("<div class='DG_MessageBoxContentHtml'></div>");
    divContentHtml.html(jsonOpt.Content);
    divContent.append(divContentHtml);
    

    //푸터
    var divFooter = $("<div class='DG_MessageBoxFooter'></div>");

    if (jsonOpt.ButtonType === DG_MessageBox.ButtonShowType.Ok
        || jsonOpt.ButtonType === DG_MessageBox.ButtonShowType.OkCancel)
    {//ok 버튼
        //ok cancel
        divFooter.append("<button>OK</button>");
        if (typeof jsonOpt.ButtonEvent === "function")
        {
            divFooter.find("button").click(function ()
            {
                jsonOpt.ButtonEvent(DG_MessageBox.ButtonType.Ok);
            });
        }
    }

    if (jsonOpt.ButtonType === DG_MessageBox.ButtonShowType.OkCancel
        || jsonOpt.ButtonType === DG_MessageBox.ButtonShowType.Cancel)
    {//ok 버튼
        divFooter.append("<button>Cancel</button>");
        if (typeof jsonOpt.ButtonEvent === "function")
        {
            divFooter.find("button").click(function ()
            {
                jsonOpt.ButtonEvent(DG_MessageBox.ButtonType.Cancel);
            });
        }
    }

    if (jsonOpt.ButtonType === DG_MessageBox.ButtonShowType.YesNo)
    {//YesNo 버튼
        divFooter.append($("<button>Yes</button>"));
        divFooter.append("<button>No</button>");

        if (typeof jsonOpt.ButtonEvent === "function")
        {
            var btn = divFooter.find("button");
            $(btn[0]).click(function ()
            {
                jsonOpt.ButtonEvent(DG_MessageBox.ButtonType.Yes);
            });
            $(btn[1]).click(function ()
            {
                jsonOpt.ButtonEvent(DG_MessageBox.ButtonType.No);
            });
        }
    }

    //html 완성하기
    divHtml.append(divTitle);
    divHtml.append(divContent);
    divHtml.append(divFooter);

    jsonOpt.Content = divHtml;

    DG_Popup.Show(jsonOpt);
};