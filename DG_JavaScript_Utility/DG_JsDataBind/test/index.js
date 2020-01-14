/** 원본 데이터 텍스트 박스 */
var domTxtInData = document.getElementById("txtInData");
/** 라이브러리가 적용된 결과 출력할 텍스트 박스 */
var domTxtResult = document.getElementById("txtResult");

var insDB = new DG_JsDataBind();


var sOriData = "test001 => {{test001}}, \n"
    + "test002:money => {{test002:money}}\n"
    + "test001:test1 => {{test001:test1}}\n"
    + "test002:test2 => {{test002:test2}}\n";

function OnStart00() {
    //기본정 샘플

    var sOriData_InData = domTxtInData.value;

    var sReturn =
        insDB.DataBind_SelectType(
            sOriData_InData
            , ["defult"]
            , {
                "test001": "test-001"
            }
            , DG_JsDataBind_MatchType.Select
        );

    domTxtResult.value = sReturn;

}

function OnStart01()
{
    //매치 리스트 지정 샘플

    var sOriData_InData = domTxtInData.value;

    var sReturn = 
        insDB.DataBind_SelectType(
            sOriData_InData
            , insDB.MatchPatternList["defult"]
            , {
                "test001": "test-001"
                , "test002": "test-002"
            }
            , DG_JsDataBind_MatchType.Select
        );

    domTxtResult.value = sReturn.ResultString;

}


function OnStart02()
{
    //매치 리스트 추가 샘플

    var sOriData_InData = domTxtInData.value;

    insDB.MatchPatternListAdd("AddTest"
        , {
            ":test1": function (sOriData, sMatchString, sValue) { return insDB.ReplaceAll(sOriData, sMatchString, sValue + ":AddTest1"); }
            , ":test2": function (sOriData, sMatchString, sValue) { return insDB.ReplaceAll(sOriData, sMatchString, sValue + ":AddTest1"); }
        });

    

    var arrTypeName = ["defult", "AddTest"];
        

    var sReturn =
        insDB.DataBind(
            sOriData_InData
            , arrTypeName
            , {
                "test001": "test-001"
                , "test002": "test-002"
            }
            , DG_JsDataBind_MatchType.Select
        );

    domTxtResult.value = sReturn.ResultString;
}

/** 셈플1 */
function Test_Sample01()
{
    //개체 생성
    var insDB = new DG_JsDataBind();
    //원본 데이터
    var sOriData = "내 나이는 {{age}}입니다.";

    //바인딩에 사용할 데이터
    var jsonValue = {
        "name": "John"
        , "age": "50"
    };

    //데이터 바인딩 시도
    var sReturn =
        insDB.DataBind(
            sOriData
            , ["defult"]
            , jsonValue
            , DG_JsDataBind_MatchType.Select
        );

    //결과 출력
    domTxtResult.value = sReturn.ResultString;
}



/** 셈플2 */
function Test_Sample02()
{
    //개체 생성
    var insDB = new DG_JsDataBind();
    //원본 데이터
    var sOriData = "내 이름은 {{name:name1}}{{name:name2}} 나이는 {{age}}입니다.";

    //사용자 정의 패턴 추가
    var jsonAdd = {
        ":name1": function (sOriData, sMatchString, sValue) { return insDB.ReplaceAll(sOriData, sMatchString, sValue); }
        , ":name2": function (sOriData, sMatchString, sValue) { return insDB.ReplaceAll(sOriData, sMatchString, "(" + sValue + ")"); }
    };

    //패턴 추가
    insDB.MatchPatternListAdd("NameAdd", jsonAdd);

    //바인딩에 사용할 데이터
    var jsonValue = {
        "name": "John"
        , "age": "50"
    };


    //데이터 바인딩 시도
    var sReturn =
        insDB.DataBind(
            sOriData
            , ["NameAdd"]
            , jsonValue
            , DG_JsDataBind_MatchType.Select
        );

    //결과 출력
    domTxtResult.value = sReturn.ResultString;
}


/** 셈플3 */
function Test_Sample03() {
    //개체 생성
    var insDB = new DG_JsDataBind();
    //원본 데이터
    var sOriData = "내 이름은 {{name:name1}}{{name:name2}} 나이는 {{age}}입니다.";

    //사용자 정의 패턴 추가
    var jsonAdd = {
        ":name1": function (sOriData, sMatchString, sValue) { return insDB.ReplaceAll(sOriData, sMatchString, sValue); }
        , ":name2": function (sOriData, sMatchString, sValue) { return insDB.ReplaceAll(sOriData, sMatchString, "(" + sValue + ")"); }
    };

    //패턴 추가
    insDB.MatchPatternListAdd("NameAdd", jsonAdd);

    //바인딩에 사용할 데이터
    var jsonValue = {
        "name": "John"
        , "age": "50"
    };


    //데이터 바인딩 시도
    var sReturn =
        insDB.DataBind(
            sOriData
            , ["defult", "NameAdd"]
            , jsonValue
            , DG_JsDataBind_MatchType.Select
        );

    //결과 출력
    domTxtResult.value = sReturn.ResultString;
}


/** 셈플4 */
function Test_Sample04() {
    //개체 생성
    var insDB = new DG_JsDataBind();
    //원본 데이터
    var sOriData = "내 이름은 {{name:name1}}{{name:name2}} 나이는 {{age}}입니다.";

    //사용자 정의 패턴 추가
    var jsonAdd = {
        ":name1": function (sOriData, sMatchString, sValue) { return insDB.ReplaceAll(sOriData, sMatchString, sValue); }
        , ":name2": function (sOriData, sMatchString, sValue) { return insDB.ReplaceAll(sOriData, sMatchString, "(" + sValue + ")"); }
    };

    //패턴 추가
    insDB.MatchPatternListAdd("NameAdd", jsonAdd);

    //바인딩에 사용할 데이터
    var jsonValue = {
        "name": "John"
        , "age": "50"
    };


    //데이터 바인딩 시도
    var sReturn =
        insDB.DataBind(
            sOriData
            , ["defult", "NameAdd"]
            , jsonValue
            , DG_JsDataBind_MatchType.First
        );

    //결과 출력
    domTxtResult.value = sReturn.ResultString;
}
