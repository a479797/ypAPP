import gql from 'graphql-tag'

//查询用户信息
export const GET_USER = gql`
    query User {
        user {
            id
            name
            username
            lastname
            email
            language
            country
            province
            city
            state
            addresses{
               id
               address
            }
            postcode
            phone
            subscribe
            connect_id
            address
        }
    }
`
//获取商品分类列表
export const GET_PRODUCT_CATEGORIES = gql`
    query product_categories {
        product_categories {
            id
            name
            active_icon {
                id
                url
            }
            deactive_icon {
                id
                url
            }
        }
    } 
`
//获取语言列表
export const GET_LANGUAGES = gql`
    query languages {
        languages {
            id
            name
            icon {
                url
            }
            code
        }
    } 
`
// 获取国家列表
export const GET_COUNTRIES = gql`
    query countries {
        countries {
            id
            name
        }
    } 
`
// 获取国家列表、语言列表
export const GET_COUNTRIES_AND_LANGUAGES = gql`
    query countries {
        countries {
            id
            name
        },
        languages {
            id
            name
            icon {
                url
            }
            code
        }
    } 
`

//获取分类对应的商品列表
export const GET_CATEGORY_PRODUCT = gql`
    query product_category($id: Int!) {
        product_category(
            id: $id
        ) {
            id
            products(page:{count:99999999}){
                id
                name
                images {
                    url
                }
                current_issue{
                    max_price
                    count_down_seconds
                    price_unit
                    issue
                }
            }
        }
    }
`

//商品规格
export const GET_PRODUCT_SPECS = gql`
    query 
    product_specs($product_id: Int!) {
        product_specs(
            product_id: $product_id
        ) {
            id
            name
            stock
        }   
    }
`

//国家列表
export const Get_Countrys = gql`
    query countries {
        countries {
          id
          name
        }
    }
`
//用户地址列表
export const USER_ADDRESS = gql`
    query user_addresses_countries {
        user_addresses {
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
        }
    }
`
export const PRODUCTS = gql`
    query products($category_id: Int, $position: String, $page:Page) {
        products(
            category_id :$category_id
            position :$position
            page :$page
        ) {
          id
          images{
            url
          }
          current_issue{
            id
            issue
            max_price
            count_down_seconds
            price_unit
          }
        }
        cart {
              id
              total
              price_unit
              total_service_fee
              freight
              items{
                id
                price
                total
                price_unit
                count
                bid_history{
                    spec{
                        name
                    }
                    issue{
                        product{
                            name
                            id
                            images{
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`
//获取购物车
export const SHOPPING_CART = gql`
    query Cart {
        cart {
              id
              total
              price_unit
              total_service_fee
              freight
              items{
                id
                price
                total
                price_unit
                count
                bid_history{
                    spec{
                        name
                    }
                    issue{
                        issue
                        product{
                            name
                            id
                            images{
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`
//获取商品
export const PRODUCT_DETAIL = gql`
    query Product ($id: Int!,$page: Page){
        product(
            id:$id
        ) {
            id
            name
            content
            specs{
                name
                id
                stock
            }
            category{
                id
                name               
            }
            images{
                url
            }
            current_issue{
                id
                bid_histories(page:$page){
                    price
                    created_at
                    user{
                        username
                    }
                }
                 product{
                    brand_id
                    name
                 }
                 issue
                 max_price
                 winner{
                    id
                    username
                    name
                 }
                 count_down_seconds
                 mark_up_price
                 messages{
                    type
                    message
                    created_at
                 }
            }
            cursor
        }
    }
`
// 通过期号查询竞拍期信息
export const PRODUCT_ISSUE = gql`
    query ProductIssue ($issue: Int!,$page: Page){
        product_issue(
            issue:$issue
        ) {
            id
            issue
            max_price
            winner {
                name
                username
                id
            }
            status
            mark_up_price
            count_down_seconds
            bid_histories(page:$page){
                price
                created_at
                user{
                    username
                }
                is_win
            }
            product{
                id
                name
                content
                images{
                    url
                }
            }
        }
    }
`

// 获取用户某一竞拍期的消息通知
export const BID_MESSAGES = gql`
    query bid_messages($issue: Int!) {
        bid_messages(
            issue :$issue
        ) {
            type
            message
            created_at
            bid_record{
                id
                price
                status
                created_at
                price_unit
            }
        }
    }
`

// 获取竞拍期的竞拍历史
export const PRODUCT_ISSUE_BID_HISTORIES = gql`
    query ProductIssueBidHistory ($issue: Int, $status: Int, $page: Page ) {
        product_issue_bid_histories(
            issue: $issue,
            status: $status,
            page: $page
        ) {
            id
            price
            user{
                name
            }
            created_at
        }
    }
`

//获取竞拍期的竞拍历史
export const MY_BID_HISTORY = gql`
    query ProductIssueBidHistory ($issue: Int, $status: Int, $page:Page){
        product_issue_bid_histories(
                issue :$issue
                status :$status
                page :$page
        ) {
              id
              price
              count
              created_at
              issue{
                id
                issue
                max_price
                mark_up_price
                product{
                    name
                    id
                }
              }
              order{
                  id
                  express_no
                  status
              }
              is_win
              price_unit
        }
    }
`

//订单
export const ORDERS = gql`
    query Order {
        orders  
         {
              id
              order_no
              created_at
              status
              express_no
        }
    }
`

// 获取运营资源
export const RESOURCES = gql`
    query Resource ($positions: [String]!){
        resources(
            positions: $positions
        ) {
              type
              position
              content
        }
    }
`

//获取购物车商品数量
export const CART_NUM = gql`
    query Cart {
        cart {
              items{
                id
               }    
        }
    }
`

//支付类型
export const PAY_MODE = gql`
    query PayType {
        pay_types {
              id
              name
              type
              content
              client
              is_third
              icon{
                id
                url
              }
        }
        
         user_addresses {
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
          user {
            id
            username
          }
        }
    }
`

//获取订单详情
export const ORDERDETAIL = gql`
    query Order ($id: ID!,$positions:[String]!){
        order(
            id: $id
        ) {
                id
                order_no
                pay_at
                pay_type{
                   id
                   name
                   type
                   content
                   client
                   is_third
                }
                items{
                    id
                    count
                    price
                    service_fee
                    total
                    price_unit
                    bid_history{
                    spec{
                        name
                    }
                    issue{
                        product{
                            name
                            id
                            images{
                                url
                            }
                        }
                    }
                }
                }
                freight
                total
                total_service_fee
                discount
                express_no
                address{
                    id
                    lastname
                    name
                    country
                    province
                    city
                    address
                    user{
                        username
                    }
                    postcode
                }
                status
                created_at
                user{
                    id
                }
                price_unit
        }
        
         pay_types {
              id
              name
              type
              content
              client
              is_third
              icon{
                id
                url
              }
        }
        resources(
            positions: $positions
        ) {
              type
              position
              content
        }
    }
`

//获取商品id对应最新一期竞拍
export const NEWEST_BID = gql`
    query product ($productId: Int!){
        product(
            id: $productId
        ) {
            current_issue{
                issue
            }
        }
    }
`
//获取公告列表
export const GET_NOTICES = gql`
    query notices ($show_page: Int){
        notices(
            show_page: $show_page
        ) {
            id
            content
            is_can_close
        }
    }
`

//查询所有订单状态
export const ORDERS_STATUS = gql`
    query Order {
        orders  
         {
              id
              status
        }
    }
`
