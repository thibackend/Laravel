import { Box, Heading, Text, SimpleGrid, Img, Grid, GridItem } from '@chakra-ui/react';
import '../../style/detail_room.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { isMotionComponent } from 'framer-motion';
export default HotelDetail;
function HotelDetail() {
    const { id } = useParams();
    let idHotel = id;
    const [hotelData, setHotelData] = useState([]);
    const [dataRun, setDataRun] = useState([]);
    const [imgs, setImgs] = useState([]);
    const [status, setStatus] = useState(true);
    const [roomList, setRoomList] = useState([]);

    const fetchData = async () => {
        try {
            let res = await axios.get(`http://127.0.0.1:8000/api/hotel_and_images/${id}`);
            if (res.data) {
                setHotelData(res.data);
                if (res.data.length > 0) {
                    setStatus(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (status) {
            fetchData();
        }
        if (hotelData.length > 0) {
            const data = hotelData[0];
            if (data && data.image) {
                setImgs(data.image);
                setDataRun(data);
            }
        }
    }, [status, hotelData]);

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/room_and_images/${idHotel}`);
                setRoomList(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRoomData();
    }, [idHotel]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '100px',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false
                }
            }
        ]
    };

    const [slider, setSlider] = useState(null);

    const next = () => {
        slider.slickNext();
    };

    const previous = () => {
        slider.slickPrev();
    };

    return (
        <Box p="100px" mt="-50px">
            {hotelData && imgs && dataRun ? (
                <>
                    <Heading mt="-30px" mb="30px">{dataRun.name} phòng {dataRun.star} sao</Heading>
                    <SimpleGrid columns={2} spacing={3}>
                        <Box>
                            <Img src={imgs[0]} alt="" w='100%' h='299px' borderTopLeftRadius="10px" borderBottomLeftRadius="10px" />
                        </Box>
                        <Box>
                            <SimpleGrid columns={2} spacing={3}>
                                {imgs.slice(1, 5).map((image, index) => (
                                    <Box key={index} className={index === 0 ? 'image-top' : 'image-bottom'}>
                                        <Img src={image} alt="" w='100%' h='143.5px' />
                                    </Box>
                                ))}
                            </SimpleGrid>
                        </Box>
                        <Grid templateColumns="repeat(6, 1fr)">
                            <GridItem as="div" colSpan={2} minHeight="100hv"></GridItem>
                            <GridItem as="div" colSpan={4}></GridItem>
                        </Grid>
                    </SimpleGrid>
                    <Text>Địa chỉ: {dataRun.address}</Text>
                    <Text>{dataRun.desc}</Text>
                    <Text>Liên hệ chủ nhà {dataRun.contact}</Text>
                    <Text>12 khách 3 phòng ngủ 9 giường4 phòng tắm đầy đủ và 1 phòng vệ sinh cơ bản</Text>
                    <Box>
                        <Text as="b">Không gian riêng để làm việc</Text>
                        <Text>Một căn phòng có Wi-fi, rất phù hợp để làm việc.</Text>
                        <Text as="b">Tự nhận phòng</Text>
                        <Text>Bạn có thể gặp nhân viên trực cửa để nhận phòng.</Text>
                        <Text as="b">Pongkuna (Praow) là Chủ nhà siêu cấp</Text>
                        <Text>Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.</Text>
                    </Box>
                    <Heading size="lg">Nơi bạn sẽ ngủ nghỉ</Heading>
                    <Slider {...sliderSettings} ref={(c) => setSlider(c)}>
                        {roomList.map((room) => (
                            <div className='detail-room'>
                                <div key={room.image[0]} >
                                    <Img src={room.image[0]} alt="" w="100%" h="200px" objectFit="cover" />
                                    <Text as="b">{room.name}</Text>
                                    <Text>{room.price}</Text>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <div className='button-move-room'>
                        <button className='button-move-left' onClick={previous}>
                            <Img src='https://d29fhpw069ctt2.cloudfront.net/icon/image/39096/preview.png' />
                        </button>
                        <button className='button-move-right' onClick={next}>
                            <Img src='https://d29fhpw069ctt2.cloudfront.net/icon/image/39097/preview.png' />
                        </button>
                    </div>
                    <Heading size="lg">Nơi này có những gì cho bạn</Heading>
                    <SimpleGrid columns={2}>
                        <Box>
                            <Text>Hướng nhìn ra núi</Text>
                            <Text>Wi-fi</Text>
                            <Text>Chỗ đỗ xe miễn phí tại nơi ở</Text>
                            <Text>Bồn tắm nước nóng</Text>
                            <Text>Máy phát hiện khí CO</Text>
                        </Box>
                        <Box>
                            <Text>Bếp</Text>
                            <Text>Không gian riêng để làm việc</Text>
                            <Text>Hồ bơi Riêng</Text>
                            <Text>Camera an ninh trong nhà</Text>
                            <Text>Máy báo khói</Text>
                        </Box>
                    </SimpleGrid>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </Box>
    );
}

export default HotelDetail;