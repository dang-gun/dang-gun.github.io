/** 원본 데이터 텍스트 박스 */
var domTxtInData = document.getElementById("txtInData");
/** 라이브러리가 적용된 결과 출력할 텍스트 박스 */
var domTxtResult = document.getElementById("txtResult");

var insDB = new DG_JsDataBind();


var sOriData = "test001 => {{test001}}, \n"
    + "test002:money => {{test002:money}}\n"
    + "test001:test1 => {{test001:test1}}\n"
    + "test002:test2 => {{test002:test2}}\n";

function OnStart01()
{
    //매치 리스트 지정 샘플

    var sOriData_InData = domTxtInData.value;

    var sReturn = 
        insDB.DataBind_SelectType(
            sOriData_InData
            , insDB.ListMatchList["defult"]
            , {
                "test001": "test-001"
                , "test002": "test-002"
            }
        );

    domTxtResult.value = sReturn;

}


function OnStart02()
{
    //매치 리스트 추가 샘플

    var sOriData_InData = domTxtInData.value;

    insDB.MatchListAdd("AddTest"
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
        );

    domTxtResult.value = sReturn;
}