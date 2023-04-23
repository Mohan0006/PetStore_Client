import axios from 'axios';
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_REVIEW_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL
  } from '../constants/productConstant';
 
export const getProducts = (keyword = '',currentPage=1,price,category,animal,rating = 0) => async (dispatch) => {
 try{
   
    dispatch({type: ALL_PRODUCTS_REQUEST})
    console.log('Animal',animal);
    let link = `https://petstore-backend-hyyl.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gt]=${price[0]}&ratings[gte]=${rating}`
     
    if(category.trim()){
        link = `https://petstore-backend-hyyl.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gt]=${price[0]}&ratings[gte]=${rating}&category=${category}`
    }

    if(animal.trim()){
        // console.log(animal);
        link = `https://petstore-backend-hyyl.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gt]=${price[0]}&ratings[gte]=${rating}&animal=${animal}`
        // console.log(link);
    }

    if(category.trim()){
        if(animal.trim()){
        link = `https://petstore-backend-hyyl.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gt]=${price[0]}&ratings[gte]=${rating}&animal=${animal}&category=${category}`
        }
    }
    console.log(link);

    
    const { data } = await axios.get(link)
    console.log("HIiiii",data);
    dispatch({
        type:ALL_PRODUCTS_SUCCESS,
        payload:data
    })


 } catch (error) {
    dispatch({
        type:ALL_PRODUCTS_FAIL,
        payload: error.response.data.message
    })
 }
}




export const getProductDetails = (id) => async (dispatch) => {
    try{
      
       dispatch({type: PRODUCTS_DETAILS_REQUEST})
   
       const { data } = await axios.get(`https://petstore-backend-hyyl.onrender.com/api/v1/product/${id}`)
    //    console.log(data);
       dispatch({
           type:PRODUCTS_DETAILS_SUCCESS,
           payload:data.product
       })
   
   
    } catch (error) {
       dispatch({
           type:PRODUCTS_DETAILS_FAIL,
           payload: error.response.data.message
       })
    }
   }

   export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_REVIEW_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(reviewData);
        const { data } = await axios.put(`https://petstore-backend-hyyl.onrender.com/api/v1/review`, reviewData, config)

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}



export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`https://petstore-backend-hyyl.onrender.com/api/v1/admin/product/${id}`, productData, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAdminProducts= (id) => async (dispatch) => {
    try{
      
       dispatch({type: ADMIN_PRODUCTS_REQUEST})
   
       const { data } = await axios.get(`https://petstore-backend-hyyl.onrender.com/api/v1/admin/products`)
       console.log(data);
       dispatch({
           type:ADMIN_PRODUCTS_SUCCESS,
           payload:data
       })
   
   
    } catch (error) {
        console.log(error);
       dispatch({
           type:ADMIN_PRODUCTS_FAIL,
           payload: error.response.data.message
       })
    }
   }



   export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_PRODUCT_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`https://petstore-backend-hyyl.onrender.com/api/v1/admin/product/new`, productData, config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`https://petstore-backend-hyyl.onrender.com/api/v1/admin/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({ type: GET_REVIEWS_REQUEST })

        const { data } = await axios.get(`https://petstore-backend-hyyl.onrender.com/api/v1/reviews?id=${id}`)

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews
        })

    } catch (error) {

        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`https://petstore-backend-hyyl.onrender.com/api/v1/reviews?id=${id}&productId=${productId}`)

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async(dispatch) =>{
    dispatch({
        type : CLEAR_ERRORS
    })
}
