/*
 * DG JsDataBind 1.0
 * https://blog.danggun.net/7449
 * https://github.com/dang-gun/DG_JsDataBind
 * 
 * test : https://dang-gun.github.io/DG_JsDataBind/test/index.html
 */

/** 생성자 */
function DG_JsDataBind()
{
    var objThis = this;
    this.MatchPatternListAdd("defult"
        , {
            "": function (sOriData, sMatchString, sValue) { return objThis.ReplaceAll(sOriData, sMatchString, sValue); }
            , ":money": function (sOriData, sMatchString, sValue) { return objThis.ReplaceAll(sOriData, sMatchString, sValue+":돈이다"); }
        });
}

/** 패턴의 앞쪽  */
DG_JsDataBind.prototype.Mark_Front = "{{";
/** 패턴의 뒷쪽  */
DG_JsDataBind.prototype.Mark_Back = "}}";

//매치패턴 관리용 리스트
DG_JsDataBind.prototype.MatchPatternList = {};


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
 * 매치패턴 리스트를 리스트에 추가한다.
 * @param {string} sMatchPatternName 매치패턴 구분용 이름
 * @param {json} josnMatchPatternList 매치패턴에 사용할 리스트
 */
DG_JsDataBind.prototype.MatchPatternListAdd = function (
    sMatchPatternName
    , josnMatchPatternList)
{
    this.MatchPatternList[sMatchPatternName] = josnMatchPatternList;
};

/**
 * 지정한 타입에 
 * @param {string} sOriData 변경에 사용할 데이터
 * @param {string[]} arrMatchPatternName 사용할 매치패턴 이름 리스트
 * @param {json} jsonValue 변환에 사용할 데이터(찾을 값, 변환할 값)
 * @returns {string} 완성된 결과
 */
DG_JsDataBind.prototype.DataBind = function (
    sOriData
    , arrMatchPatternName
    , jsonValue)
{
    //리턴할 데이터
    var sReturn = sOriData;

    //원본 백업
    var sOriDataTemp = sOriData;

    //데이터 백업
    var jsonValueTemp = jsonValue;

    if (true === Array.isArray(arrMatchPatternName))
    {
        for (var i = 0; i < arrMatchPatternName.length; ++i)
        {
            //사용할 타입 이름
            var sItem = arrMatchPatternName[i];

            //사용할 타입 검색
            var jsonTypeData = this.MatchPatternList[sItem];

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
 * @param {string} sMatchPatternData 사용할 매치패턴 데이터 - 매치패턴 문자열
 * @param {function} funMatchPatternData 사용할 매치패턴 데이터 - 연결된 함수)
 * @param {json} jsonValue 변환에 사용할 데이터(찾을 값, 변환할 값)
 * @returns {string} 완성된 결과
 */
DG_JsDataBind.prototype.DataBind_TypeItme = function (
    sOriData
    , sMatchPatternData
    , funMatchPatternData
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
        var sMatchString = this.Mark_Front + sValueName + sMatchPatternData + this.Mark_Back;
        
        if (0 <= sOriDataTemp.indexOf(sMatchString))
        {//매치에 성공한 데이터가 있다.
            sOriDataTemp = funMatchPatternData(sOriDataTemp, sMatchString, sValue);
        }
    }

    return sOriDataTemp;
};

/**
 * 원본에서 지정된 타입의 찾아서 변환값을 찾아서 함수를 호출한다.
 * @param {string} sOriData 원본
 * @param {json} jsonMatchPatternData 비교할 매치패턴 데이터 리스트
 * @param {json} jsonValue 변환에 사용할 데이터(찾을 값, 변환할 값)
 * @returns {string} 완성된 결과
 */
DG_JsDataBind.prototype.DataBind_SelectType = function (
    sOriData
    , jsonMatchPatternData
    , jsonValue)
{
    //원본 백업
    var sOriDataTemp = sOriData;

    //타입데이터를 키로 변환
    var jsonMatchPatternKeys = Object.keys(jsonMatchPatternData);

    for (var i = 0; i < jsonMatchPatternKeys.length; ++i)
    {
        //타입 이름 추출
        var sMatchPatternName = jsonMatchPatternKeys[i];
        //타입 함수 추축
        var funMatchPattern = jsonMatchPatternData[sMatchPatternName];

        //변환 함수 호출
        sOriDataTemp
            = this.DataBind_TypeItme(sOriDataTemp
                                    , sMatchPatternName
                                    , funMatchPattern
                                    , jsonValue);
    }


    return sOriDataTemp;
};
