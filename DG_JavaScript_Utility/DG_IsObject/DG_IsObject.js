/*
 * DG dgIsObject 1.0
 * https://blog.danggun.net/7449
 * https://github.com/dang-gun/DG_JsDataBind
 *
 * test : https://dang-gun.github.io/DG_JsDataBind/test/index.html
 */

var dgIsObject = {};

/**
 * 들어온 오브젝트가 bool값인지 여부 판단.
 * bool값인지를 확인하는 것이지 들어있는 값이 참인지 거짓인지는 판단하지 않는다.
 * @param {object} objData 판단할 오브젝트
 * @returns {boolean} bool값인지 여부.
 */
dgIsObject.IsBool = function (objData)
{
    var bReturn = false;

    if (typeof objData === "boolean")
    {
        bReturn = true;
    }

    return bReturn;
};

/**
 * 들어온 오브젝트가 bool값인지 여부 판단하고 값을 리턴한다.
 * 들어온 타입이 'bool'이 아니면 false가 리턴된다.
 * true나 false로 판단이 가능하면 판단된 값이 리턴된다.
 * @param {object} objData 판단할 오브젝트
 * @returns {boolean} 값의 판단 여부.
 */
dgIsObject.IsBoolValue = function (objData)
{
    var bReturn = false;
    if (true === dgIsObject.IsBool(objData))
    {//들어온 값이 bool값이다.
        bReturn = objData;
    }

    return bReturn;
};

/**
 * 들어온 오브젝트가 string값인지 여부 판단.
 * @param {object} objData 판단할 오브젝트
 * @returns {boolean} string값인지 여부.
 */
dgIsObject.IsString = function (objData) {
    var bReturn = false;

    if (typeof objData === "string") {
        bReturn = true;
    }

    return bReturn;
};

/**
 * 들어온 오브젝트가 string값인지 여부 판단하고 비어있는지 여부를 판단한다.
 * 
 * @param {object} objData 판단할 오브젝트
 * @returns {boolean} string값이 아니거나 비어있을때 false.
 */
dgIsObject.IsStringNotEmpty = function (objData) {
    var bReturn = false;

    if (true === dgIsObject.IsString(objData))
    {//문자열이 맞다.
        if (0 < objData.length)
        {
            bReturn = true;
        }
    }

    return bReturn;
};

/**
 * 들어온 오브젝트가 int값인지 여부 판단.
 * @param {object} objData 판단할 오브젝트
 * @returns {boolean} int값인지 여부.
 */
dgIsObject.IsInt = function (objData) {
    var bReturn = false;

    if (true === Number.isInteger(bReturn)) {
        bReturn = true;
    }

    return bReturn;
};