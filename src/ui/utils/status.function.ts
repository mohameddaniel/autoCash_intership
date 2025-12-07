import { STATUS } from "./color.ui"

export  const getStatusColors = (status:string) => {
    switch(status){
        case 'publiée':
            return {
                text_color:STATUS.pub_text,
                back_color:STATUS.pub_back
            }
        case 'expertise':
            return {
                text_color:STATUS.exp_text,
                back_color:STATUS.exp_back
            }
    }
}