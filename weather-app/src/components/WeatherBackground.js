import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardHeader, CardBody, CardFooter, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react';


const WeatherBackground = (props) => {

    const key = process.env.REACT_APP_WEATHER_API_KEY;

    const [weather, setWeather] = useState();

    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=Phoenix`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setWeather(data);
            })
            .catch(error => {
                console.log(error);
                setWeather('undefined');
            })
    }, [])

    const button = document.getElementById('change-location');
    const locationInput = document.getElementById('location-input');
    return (
        <Card maxW='sm' w='xl' maxH='lg' h='lg' align='center' justifyContent='center' textAlign='center'>
            <CardBody>
                {weather ? (
                    <div>
                        <Stack mt='6' spacing='3' align='center'>
                            <Heading size='md'>Current Weather</Heading>
                            <h1>{weather.location.name}, {weather.location.region}</h1>
                            <img
                            src={weather.current.condition.icon}
                            height='50px'
                            width='50px'
                            alt='Sunny'
                        />
                        <Text fontSize='4xl'>{weather.current.temp_f}&deg;F</Text>
                        <Text>{weather.current.condition.text}</Text>
                        </Stack>
                    </div>
                ) : (
                    <Spinner/>
                )}
            </CardBody>
            <CardFooter align='center' justifyContent='center' flexDir='column'>
                    <Button id="change-location" variant='solid' colorScheme='blue' onClick={() => {
                        locationInput.classList.add('location-input-active');
                        button.classList.add('move-up');
                    }}>
                        Change Location
                    </Button>
                    <input id="location-input" className='location-input' placeholder='Input new location...'></input>
            </CardFooter>
        </Card>
    )
}

export default WeatherBackground;