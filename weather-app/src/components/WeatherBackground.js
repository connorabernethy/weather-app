import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardHeader, CardBody, CardFooter, Divider, Heading, Stack, Text, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react';


const WeatherBackground = (props) => {

    const key = process.env.REACT_APP_WEATHER_API_KEY;
    let response = null;

    const [weather, setWeather] = useState();
    const [location, setLocation] = useState();

    let url = '';
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({lat: position.coords.latitude, lon: position.coords.longitude});
            url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${position.coords.latitude},${position.coords.longitude}`;
    })} else {
        url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=1,1`;
    }

    useEffect(() => {
        try {
            fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${location.lat},${location.lon}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                response = data;
                console.log(data);
                setWeather(data);
            })
            .catch(error => {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
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
                                alt='Weather Icon'
                            />
                            <Text fontSize='4xl'>{weather.current.temp_f}&deg;F</Text>
                            <Text>{weather.current.condition.text}</Text>
                        </Stack>
                    </div>
                ) : (
                    <Stack w='100%' h='100%' alignItems='center' justifyContent='center'>
                        <Spinner />
                    </Stack>
                )}
            </CardBody>
            <CardFooter align='center' justifyContent='center' flexDir='column' gap="10px">
                <InputGroup>
                    <InputLeftElement
                    pointerEvents='none'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" strokeWidth="1"/>
                            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" strokeWidth="1"/>
                        </svg>
                    </InputLeftElement>
                    <Input type="text" id="location-input" placeholder='Input new location...'></Input>
                </InputGroup>
                <Button id="change-location" variant='solid' colorScheme='blue' onClick={() => {
                    console.log(weather);
                    console.log(url);
                }}>
                    Change Location
                </Button>
            </CardFooter>
        </Card>
    )
}

export default WeatherBackground;