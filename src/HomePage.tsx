import {useEffect, useState} from "react";
import {Car, getCars} from "./api";


const HomePage = () => {
    const [cars, SetCars] = useState<Car[]>([])

    useEffect(() => {

        const loadCars = async () => {

            const cars = await getCars()
            SetCars(cars)

        }
        loadCars()

    })




    return (
        <div className="container">

            <ul>
                {cars.map(car => (

                        <div key={car.id}>
                            <p>{car.name}</p>
                        </div>

                    )
                )}
            </ul>

        </div>

    )

}

export default HomePage