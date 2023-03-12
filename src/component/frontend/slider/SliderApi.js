
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./sliderApi.css"
const SliderApi = () => {

    const [data, setData] = useState([])
    console.log(data)
    const fatchData = () => {
        return axios.get('http://localhost/Backend/api/department/getdepartments').then((res) => {
            setData(res.data.data)
        })
    }
    useEffect(() => {
        fatchData()
    }, [])
    return (
        <div className='box' style={{ display: "flex", columnGap: "1rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap", rowGap: "1rem", }} >

            <div className='ss'>
                <img src='http://etherstaging.com/unitedhospitalapi/public/DepartmentImage/202211141219skin-01.png' style={{ borderRadius: "30%", width: "20%" }} />
                <h5 className='hovers'>ENT</h5>
            </div>
            <div className='ss'>
                <img src='http://etherstaging.com/unitedhospitalapi/public/DepartmentImage/202211141219skin-01.png' style={{ borderRadius: "30%", width: "20%" }} />
                <h5 className='hovers'>Dentistry</h5>
            </div>
            <div className='ss'>
                <img src='http://etherstaging.com/unitedhospitalapi/public/DepartmentImage/202211141219skin-01.png' style={{ borderRadius: "30%", width: "20%" }} />
                <h5 className='hovers'>Dermatology</h5>
            </div>
            <div className='ss'>
                <img src='http://etherstaging.com/unitedhospitalapi/public/DepartmentImage/202211141219skin-01.png' style={{ borderRadius: "30%", width: "20%" }} />
                <h5 className='hovers'>Cardiology</h5>
            </div>
            <div className='ss'>
                <img src='http://etherstaging.com/unitedhospitalapi/public/DepartmentImage/202211141219skin-01.png' style={{ borderRadius: "30%", width: "20%" }} />
                <h5 className='hovers'>Hips</h5>
            </div>
            <div className='ss'>
                <img src='http://etherstaging.com/unitedhospitalapi/public/DepartmentImage/202211141219skin-01.png' style={{ borderRadius: "30%", width: "20%" }} />
                <h5 className='hovers'>Psychology</h5>
            </div>
            <div className='ss'>
                <img src='http://etherstaging.com/unitedhospitalapi/public/DepartmentImage/202211141219skin-01.png' style={{ borderRadius: "30%", width: "20%" }} />
                <h5 className='hovers'>Haematology</h5>
            </div>
            <div className='ss'>
                <img src='http://etherstaging.com/unitedhospitalapi/public/DepartmentImage/202211141219skin-01.png' style={{ borderRadius: "30%", width: "20%" }} />
                <h5 className='hovers'>Physiotherapy</h5>
            </div>




        </div>
    )
}

export default SliderApi