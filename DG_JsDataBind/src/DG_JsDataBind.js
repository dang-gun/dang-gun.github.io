/*
 * DG JsDataBind 1.0
 * https://blog.danggun.net/7449
 * https://github.com/dang-gun/DG_JsDataBind
 */

/** 생성자 */
function DG_JsDataBind()
{
    var objThis = this;
    this.MatchListAdd("defult"
        , {
            "": function (sOriData, sMatchString, sValue) { return objThis.ReplaceAll(sOriData, sMatchString, sValue); }
            , ":money": function (sOriData, sMatchString, sValue) { return objThis.ReplaceAll(sOriData, sMatchString, sValue+":돈이다"); }
        });
}

/** 패턴의 앞쪽  */
DG_JsDataBind.prototype.FrontMark = "{{";
/** 패턴의 뒷쪽  */
DG_JsDataBind.prototype.BackMark = "}}";

//리스트매치 관리용 리스트
DG_JsDataBind.prototype.ListMatchList = {};


/**
 * 지정한 문자열을 모두 찾아 
 * @param {string} sOriData 원본
 * @param {string} sSearch 찾을 문자열
 * @param {string} sReplacement 바꿀 문자열
 * @returns {string} 완성된 결과
 */
DG_JsDataBind.prototype.ReplaceAll = function (sOriData, sSearch, sReplacement)
{
    return sOriData.replace(new RegExp(sSearch, 'g'), sReplacement);
};

/**
 * 리스트매치를 리스트에 추가한다.
 * @param {string} sTypeName 리스트매치 구분용 타입
 * @param {json} josnListMatch 리스트매치에 사용할 리스트
 */
DG_JsDataBind.prototype.MatchListAdd = function (sTypeName, josnListMatch)
{
    this.ListMatchList[sTypeName] = josnListMatch;
};

/**
 * 지정한 타입에 
 * @param {string} sOriData 변경에 사용할 데이터
 * @param {string[]} arrTypeName 사용할 매치 타입 이름 리스트
 * @param {json} jsonValue 변환에 사용할 데이터(찾을 값, 변환할 값)
 * @returns {string} 완성된 결과
 */
DG_JsDataBind.prototype.DataBind = function (sOriData, arrTypeName, jsonValue)
{
    //리턴할 데이터
    var sReturn = sOriData;

    //원본 백업
    var sOriDataTemp = sOriData;

    //데이터 백업
    var jsonValueTemp = jsonValue;

    if (true === Array.isArray(arrTypeName))
    {
        for (var i = 0; i < arrTypeName.length; ++i)
        {
            //사용할 타입 이름
            var sItem = arrTypeName[i];

            //사용할 타입 검색
            var jsonTypeData = this.ListMatchList[sItem];

            if (jsonTypeData)
            {//사용할 타입이 있다.
                sOriDataTemp
                    = this.DataBind_SelectType(
                        sOriDataTemp
                        , jsonTypeData
                        , jsonValueTemp);
            }
            
        }//end for i

        //완성본 백업
        sReturn = sOriDataTemp;
    }


    return sReturn;
};

/**
 * 원본에서 지정된 변환값에 타입이름을 합쳐서 찾은 후 연결된 함수를 호출한다.
 * @param {string} sOriData 원본
 * @param {string} sTypeData 사용할 타입 데이터 - 타입 문자열
 * @param {function} funTypeData 사용할 타입 데이터 - 연결된 함수)
 * @param {json} jsonValue 변환에 사용할 데이터(찾을 값, 변환할 값)
 * @returns {string} 완성된 결과
 */
DG_JsDataBind.prototype.DataBind_TypeItme = function (
    sOriData
    , sTypeData
    , funTypeData
    , jsonValue)
{
    //원본 백업
    var sOriDataTemp = sOriData;

    //변환할 데이터 키 리스트
    var jsonValueKeys = Object.keys(jsonValue);

    for (var i = 0; i < jsonValueKeys.length; ++i)
    {
        //값의 이름부분
        var sValueName = jsonValueKeys[i];
        //변경에 사용할 데이터
        var sValue = jsonValue[sValueName];

        //매치용 문자열
        var sMatchString = this.FrontMark + sValueName + sTypeData + this.BackMark;
        
        if (0 <= sOriDataTemp.indexOf(sMatchString))
        {//매치에 성공한 데이터가 있다.
            sOriDataTemp = funTypeData(sOriDataTemp, sMatchString, sValue);
        }
    }

    return sOriDataTemp;
};

/**
 * 원본에서 지정된 타입의 찾아서 변환값을 찾아서 함수를 호출한다.
 * @param {string} sOriData 원본
 * @param {json} jsonTypeData 비교할 타입데이터 리스트
 * @param {json} jsonValue 변환에 사용할 데이터(찾을 값, 변환할 값)
 * @returns {string} 완성된 결과
 */
DG_JsDataBind.prototype.DataBind_SelectType = function (sOriData, jsonTypeData, jsonValue)
{
    //원본 백업
    var sOriDataTemp = sOriData;

    //타입데이터를 키로 변환
    var jsonTypeDataKeys = Object.keys(jsonTypeData);

    for (var i = 0; i < jsonTypeDataKeys.length; ++i)
    {
        //타입 이름 추출
        var sTypeDataName = jsonTypeDataKeys[i];
        //타입 함수 추축
        var funTypeData = jsonTypeData[sTypeDataName];

        //변환 함수 호출
        sOriDataTemp
            = this.DataBind_TypeItme(sOriDataTemp
                                    , sTypeDataName
                                    , funTypeData
                                    , jsonValue);
    }


    return sOriDataTemp;
};
