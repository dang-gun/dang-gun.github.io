/**
 * Multiple analog
 * 다중 다얄로그
 * 다중 팝업 라이브러리
 * 
 * 
 * */
var DG_Popup = {};

/** z인덱스 시작값 */
DG_Popup.ZindexStart = 1000;
/** 다음 창의 z인덱스 추가 값 */
DG_Popup.ZindexAdd = 10;


/** 생성된 팝업의 고유번호를 발행용 */
DG_Popup.PopupIndex = 0;

/** 현재 선택된 인덱스 */
DG_Popup.SelectIndex = 0;
/** 현재 선택된 팝업 */
DG_Popup.SelectDiv = null;

/** 0: 없음, 1:다운, 2:업 */
DG_Popup.MouseState = 0;
/** 마우스 다운 계산값 X */
DG_Popup.MouseDownX = 0;
/** 마우스 다운 계산값 Y */
DG_Popup.MouseDownY = 0;

/** 창이 생성되면 쌓일 배열 */
DG_Popup.List = [];

/** 창열기 기본 옵션 */
DG_Popup.ShowOptionDefault = {
    /** 시작위치 - Y */
    top: 0,
    /** 시작위치 - X */
    left: 0,
    /** 가로 크기 */
    width: "auto",
    /** 세로 크기 */
    height: "auto",

    /** 부모에 적용할 css */
    ParentCss: "",
    /** 팝업이 완성되면 크기를 고정할지 여부 
        이 옵션이 없으면 창이동시 크기가 변경될수 있다.
     */
    SizeFixed: false,

    /** 팝업 안에 표시할 컨탠츠
     * 오브젝트도 가능하다. */
    Content: "",
    /** 컨탠츠에 적용할 css */
    ContentCss: "",
    /** 컨탠츠에 적용할 배경색 */
    ContentBackground: "#fff",

    /**
     * 오버레이 클릭시 사용할 이벤트
     * null이면 오버레이를 클릭해도 동작하지 않는다.
     * 창을 닫으려면 'DG_Popup.CloseTarget(divPopupParent);'를 넣는다.
     * 
     * function (nPopupIndex, divPopupParent)
     * nPopupIndex : 생성에 사용된 인덱스
     * divPopupParent : 생성된 창의 개체 
     * */
    OverlayClick: null,
    /** 오버레이용 배경색 */
    OverlayBackground: "#aaa",
    /** 오버레이 불투명 값 */
    OverlayOpacity: 0.3,
    /** 오버레이에 적용할 css */
    OverlayCss: ""
};

/**
 * DG_Popup를 초기화 한다.
 * @param {json} jsonShowOptionDefault 기본 옵션으로 사용할 옵션
 */
DG_Popup.Initialize = function (jsonShowOptionDefault)
{
    //옵션 합치기
    DG_Popup.ShowOptionDefault
        = Object.assign(DG_Popup.ShowOptionDefault, jsonShowOptionDefault);

    $(document).on("mousedown", "div.DG_PopupTitle", function (e)
    {
        //좌표가 수정될 상위 div를 찾는다.
        //DG_Popup.SelectDiv = $(this).parent();
        DG_Popup.SelectDiv = $(this).parents(".DG_PopupContentCss");
        DG_Popup.SelectIndex = DG_Popup.SelectDiv.attr("popupIndex");

        //마우스 상태 변경
        DG_Popup.MouseState = 1;
        //마우스 다운 계산값
        DG_Popup.MouseDownX = e.clientX - DG_Popup.CutBack(DG_Popup.SelectDiv.css("left"));
        DG_Popup.MouseDownY = e.clientY - DG_Popup.CutBack(DG_Popup.SelectDiv.css("top"));

    });

    $(document).on("mousemove", "div.DG_PopupTitle", function (e)
    {
        if (1 === DG_Popup.MouseState)
        {//마우스 다운 상태
            //창위치 변경
            DG_Popup.SelectDiv.css("left", e.clientX - DG_Popup.MouseDownX);
            DG_Popup.SelectDiv.css("top", e.clientY - DG_Popup.MouseDownY);
        }
    });

    $(document).on("mouseup", "div.DG_PopupTitle", function (e)
    {
        //마우스 상태 변경
        DG_Popup.MouseState = 2;
    });
};

/**
 * DG_JQuery_Popup를 만들어서 표시한다.
 * @param {json} jsonOption 창옵션
 * @returns {object} 만들어진 팝업 오브젝트
 */
DG_Popup.Show = function (jsonOption)
{
    var jsonOptDefault = DG_Popup.ShowOptionDefault;

    //옵션 합치기
    var jsonOpt = Object.assign(jsonOptDefault, jsonOption);

    //고유키 증가;
    var nPopupIndex = ++DG_Popup.PopupIndex;

    //사용할 z인덱스 계산
    var nZIdx = DG_Popup.ZindexStart + (DG_Popup.ZindexAdd * DG_Popup.List.length);

    //부모용 div*************
    var divPopupParent = $("<div id='divDG_PopupParent" + nPopupIndex
        + "' class='DG_PopupParentCss' popupIndex='" + nPopupIndex + "'></div>");
    //사용자 정의 css 추가
    divPopupParent.addClass(jsonOpt.ParentCss);

    //오버레이용 div*************
    var divOverlay = $("<div id='divDG_PopupOverlay" + nPopupIndex
        + "' class='DG_PopupOverlayCss'></div>");
    divOverlay.addClass(jsonOpt.OverlayCss);
    divOverlay.css("background", jsonOpt.OverlayBackground);
    divOverlay.css("opacity", jsonOpt.OverlayOpacity);

    divOverlay.css("position", "fixed");
    divOverlay.css("top", "0px");
    divOverlay.css("left", "0px");
    divOverlay.css("width", "100%");
    divOverlay.css("height", "100%");

    divOverlay.css("z-index", nZIdx);

    
    

    //컨탠츠용 div*************
    var divContent = $("<div id='divDG_Popup" + nPopupIndex
        + "' class='DG_PopupContentCss' popupIndex='" + nPopupIndex + "'></div>");
    //사용자 정의 css 추가
    divContent.addClass(jsonOpt.ContentCss);
    divContent.css("position", "absolute");
    divContent.css("background", jsonOpt.ContentBackground);

    divContent.css("top", jsonOpt.top + "px");
    divContent.css("left", jsonOpt.left + "px");
    divContent.css("width", jsonOpt.width);
    divContent.css("height", jsonOpt.height);

    divContent.css("z-index", nZIdx + 1 );

    //html 출력
    if (typeof jsonOpt.Content === "string")
    {//문자열인 경우
        divContent.html(jsonOpt.Content);
    }
    else if (typeof jsonOpt.Content === "object")
    {//오브젝트인 경우
        divContent.append(jsonOpt.Content);
    }
    

    //부모 div에 추가 한다.
    divPopupParent.append(divContent);
    divPopupParent.append(divOverlay);
    //바디 끝에 사용할 div를 만들어 준다.
    $("body").append(divPopupParent);

    //새로 추가한 개체를 찾는다.****************************************
    var divPopupParent_New = $("#divDG_PopupParent" + nPopupIndex);
    var divPopup_New = $("#divDG_Popup" + nPopupIndex);
    var divOverlay_New = $("#divDG_PopupOverlay" + nPopupIndex);

    if (true === jsonOpt.SizeFixed)
    {//크기 고정
        //완성된 크기 받기
        var nSize = divPopup_New.width();
        //완성된 크기를 고정값으로 지정
        divPopup_New.width(nSize);
    }
    

    //빈곳을 클릭했을때 이벤트 주기
    if (typeof jsonOpt.OverlayClick === "function")
    {
        divOverlay_New.click(function ()
        {
            jsonOpt.OverlayClick(nPopupIndex, divPopupParent_New);
        });
    }

    //배열에 추가한다.
    DG_Popup.List.push(divPopupParent_New);

    

    //완성된 개체를 리턴한다.
    return divPopupParent;
};

/**
 * Css의 데이터값에 단위를 제거해준다.
 * @param {string} sData 변환할 데이터
 * @returns {int} 변환된 값
 */
DG_Popup.CutBack = function (sData)
{
    var nReturn = 0;

    if (false === isNaN(sData))
    {//숫자형이다.
        nReturn = Number(sData);
    }
    else
    {//숫자형이 아니다.
        //단위는 끝에 2자리이다.
        if (2 < sData.length)
        {//2자리 초과다.
            //뒤에 2칸을 제외하고 받는다.
            var sCut = sData.substring(0, sData.length - 2);

            if (false === isNaN(sCut))
            {//남은 글자가 숫자다.
                nReturn = Number(sCut);
            }
        }
    }

    return nReturn;
};

/** 맨 마지막 팝업을 닫는다. */
DG_Popup.Close = function ()
{
    //리스트 개수
    var nIndex = DG_Popup.List.length - 1;

    DG_Popup.CloseIndex(nIndex);
};

/**
 * 지정한 인덱스의 팝업을 닫는다.
 * @param {int} nIndex 닫을 인덱스
 */
DG_Popup.CloseIndex = function (nIndex)
{
    //팝업 개체 삭제
    DG_Popup.List[nIndex].remove();

    //리스트에서 대산 인덱스 제거
    DG_Popup.List.splice(nIndex, 1);
};

/** 모든 팝업을 닫는다. */
DG_Popup.CloseAll = function ()
{
    var nArrLen = DG_Popup.List.length;

    for (var i = 0; i < nArrLen; ++i)
    {
        DG_Popup.Close();
    }
};

/**
 * 지정한 대상을 닫는다.
 * @param {object} objTarget 닫을 대상
 */
DG_Popup.CloseTarget = function (objTarget)
{
    var nArrLen = DG_Popup.List.length;

    for (var i = 0; i < nArrLen; ++i)
    {
        if (true === Object.is(DG_Popup.List[i], objTarget))
        {//일치하는 오브젝트를 찾았다.
            DG_Popup.CloseIndex(i);
            break;
        }
    }
};