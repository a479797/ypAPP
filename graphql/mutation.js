import gql from 'graphql-tag'

export const MODIFY_PASSWORD = gql`
    mutation user($id: String!, $password: String!) {
        updateUserPassword(
            id: $id,
            password: $password
        ) {
            id
            name
            token
        }
    }
`
//注册
export const REGISTER = gql`
    mutation User($username: String!,$email: String!,$password: String!,$country: String!) {
        register(
            username: $username,
            email: $email,
            password: $password,
            country: $country
        ) {
            token
        }
    }
`
// 用户登录
export const LOGIN = gql`
    mutation User($username: String!,$password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            token
        }
    }
`
export const THIRDLOGIN = gql`
    mutation User(
        $from: String!,
        $connect_id: String!,
        $country: String,
        $province: String,
        $city: String,
        $state: String,
        $email: String!,
        $name: String
    ) {
        thirdLogin(
            from:$from,
            connect_id: $connect_id,
            country: $country,
            province: $province,
            city: $city,
            state: $state,
            email: $email,
            name: $name
        ) {
            token
        }
    }
`
// 忘记密码
export const FORGET_PASSWORD = gql`
    mutation User($email: String!) {
        forgotPassword(
            email: $email,
        )
     }
`
// 重设密码
export const FORGET_PASSWORD_RESET = gql`
    mutation User($token: String!,$email: String!,$password: String!) {
        forgotPasswordReset(
            token: $token,
            email: $email,
            password: $password
        ) {
            id
        }
     }
`
// 用户信息
export const USERPROFILE = gql`
    mutation User($name: String,$lastname: String,$address: String,$country: String,$province: String,$postcode: String,$phone: String,$language: String,$subscribe: Int) {
        updateProfile(
            name: $name,
            lastname: $lastname,
            address: $address,
            country: $country,
            province: $province,
            postcode: $postcode,
            phone: $phone,
            language: $language,
            subscribe: $subscribe,
        
        ) {
            token
        }
    }
`
// 修改国家和语言
export const CHANG_COUNTRY_LANGUAGE = gql`
    mutation User($country: String,$language: String,$province: String,$address: String) {
        updateProfile(
            country: $country,
            language: $language,
            province: $province,
            address: $address
        ) {
            token
        }
    }
`
// 竞拍出价
export const ADD_BID_RECORD = gql`
    mutation User($price:String!,$issue_id:Int!,$spec_id:Int!) {
        addBidRecord(
            price: $price,
            issue_id: $issue_id,
            spec_id: $spec_id
        ){
            id
        }
     }
`

//退出登录
export const LOGOUT = gql`
    mutation User{
        logout {
            id
        }
     }
`

//删除购物车商品
export const DELETECARTITEM = gql`
    mutation deleteCartItem($itemId:  ID!) {
        deleteCartItem(
            item: $itemId,
        )
    }
`
//增加收货地址
export const ADDADDRESS = gql`
    mutation addAddress($province: String,$city: String,$state: String,$address: String,$name: String,$lastname: String,$postcode: String,$phone: String!,$remark: String) {
        addAddress(
            province: $province,
            city: $city,
            state: $state,
            address: $address,
            name: $name,
            lastname: $lastname,
            postcode: $postcode,
            phone: $phone,
            remark: $remark
        ){
              id
              user_id
              name
              lastname
              country
              province
              city
              state
              address
              postcode
              email
              phone
              remark
              user{
                username
              }
        }
    }
`

//下单
export const SUBMITORDER = gql`
    mutation Order($user_address_id: Int!,$pay_way_id: Int!) {
        addOrder(
            user_address_id: $user_address_id,
            pay_way_id:$pay_way_id
        ){
                id
                order_no
        }
    }
`
