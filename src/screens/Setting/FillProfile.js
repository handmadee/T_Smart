import React, { useCallback, useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";
import { Container } from "../../components/Container";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Color, FontFamily, FontSize } from "../../../GlobalStyles";
import { useForm, Controller } from "react-hook-form";
import Input from "../../components/Input";
import DatePicker from "react-native-date-picker";
import { Calendar } from "iconsax-react-native";
import Button from "../../components/Button";
import DropDownPicker from "react-native-dropdown-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { editInfor } from "../../apis/courseApi";
import LoadingView from "../Auth/LoadingScreen";
import { updateInfor } from "../../redux/token/slice.token";



export default function FillProfile() {
    const dispatch = useDispatch();
    const inforUser = useSelector(state => state.authReducer?.authData?.infor);
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const { control, handleSubmit, formState: { errors } } = useForm();
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);


    const selectImage = useCallback(() => {
        const options = {
            title: "Select Avatar",
            storageOptions: {
                skipBackup: true,
                path: "images",
            },
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                alert('An error occurred while selecting the image. Please try again.');
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response)
                setImage(response?.assets[0]);
                setPreviewImage(response?.assets[0]?.uri);
            }
        });
    }, []);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('fullname', data.fullName);
        formData.append('phone', data.phoneNumber);
        formData.append('email', data.userName);
        if (image) {
            const imageBlob = {
                uri: image?.uri,
                type: image?.type,
                name: image?.fileName,
            };
            formData.append('avatar', imageBlob);
        }

        try {
            setLoading(true);
            await editInfor(inforUser?._id, formData);
            dispatch(updateInfor({ ...inforUser, fullname: data.fullName, email: data.userName, phone: data.phoneNumber, avatar: image?.uri }));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        loading ? <LoadingView /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorGhostwhite }}>
                <Container width={wp(90)} style={styles.container}>
                    {/* Profile */}
                    <Pressable
                        style={{
                            borderColor: Color.globalApp,
                            borderWidth: 2,
                            borderRadius: wp(25),
                            padding: 10
                        }}
                        onPress={selectImage}>
                        <Image
                            source={previewImage ? { uri: previewImage } : (inforUser?.avatar ? { uri: inforUser?.avatar } : require("./../../../assets/avatar.png"))}
                            style={{ width: wp(25), height: wp(25), borderRadius: 50 }}
                            resizeMode="cover"
                        />
                    </Pressable>

                    {/* Form  */}
                    <View style={{ marginTop: hp(5) }}>

                        {/* FullName */}
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <Input
                                    show={false}
                                    label={'FullName'}
                                    placeholder={'Full Name'}
                                    onChange={field.onChange}
                                    value={field.value}
                                    error={errors.fullName ? true : false}
                                    err={errors.fullName ? errors.fullName.message : ''}
                                    disable={false}
                                />
                            )}
                            name="fullName"
                            defaultValue={inforUser?.fullname}
                            rules={{
                                required: "Vui lòng nhập tên của bạn", pattern: {
                                    value: /^[a-zA-Z\s]+$/
                                    , message: "Hãy nhập đúng tên của bạn !!"
                                }
                            }

                            }
                        />
                        {/* PhoneNumber */}
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <>
                                    <View style={[styles.input, { flexDirection: "row", alignItems: "center" }]}>
                                        <Image
                                            source={require("./../../../assets/vietnam.png")}
                                            resizeMode="contain"
                                            style={{ width: wp(10), height: hp(6) }}
                                        />
                                        <TextInput
                                            placeholder="+84xxxx"
                                            style={{ marginLeft: 20 }}
                                            onChangeText={field.onChange}
                                            value={field.value}
                                        />
                                    </View>
                                    <Text style={{ alignSelf: 'flex-start', color: 'red' }}>
                                        {errors.phoneNumber && errors.phoneNumber.message}
                                    </Text>
                                </>
                            )}
                            name="phoneNumber"
                            defaultValue={inforUser?.phone}
                            rules={{ required: "Phone Number is required", pattern: { value: /^[0-9]{10}$/, message: "Invalid phone number" } }}
                        />
                        {/* Email */}
                        <Controller
                            control={control}
                            render={({ field }) => (
                                <Input
                                    show={false}
                                    label={'Your Email'}
                                    placeholder={'Email'}
                                    onChange={field.onChange}
                                    value={field.value}
                                    error={errors.userName ? true : false}
                                    err={errors.userName ? errors.userName.message : ''}
                                    disable={false}
                                />
                            )}
                            name="userName"
                            defaultValue={inforUser?.email}
                            rules={{ required: "Email không được để trống", pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Vui lòng nhập đúng định dạng email" } }}
                        />
                        {/* Calede */}
                        <Pressable
                            style={[styles.input, { marginBottom: hp(2), flexDirection: "row", alignItems: "center" }]}
                            onPress={() => console.log("Open calendar")}
                        >
                            <Calendar size={FontSize.size_mini} color={Color.colorDimgray_200} />
                            <Text
                                style={{
                                    fontFamily: FontFamily.mulishBold,
                                    color: Color.colorDimgray_200,
                                    marginLeft: 10,
                                }}
                            >
                                {date.toString()}
                            </Text>
                        </Pressable>

                        {/* Button */}
                        <Button title="Change" onPress={handleSubmit(onSubmit)} />
                    </View>
                </Container>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: hp(2),
        backgroundColor: Color.colorGhostwhite,
    },
    input: {
        width: wp(90),
        height: hp(7.5),
        marginTop: hp(1),
        borderRadius: 13,
        backgroundColor: Color.colorGhostwhite,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(3),
        ...Platform.select({
            ios: {
                shadowColor: Color.colorDimgray_200,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});