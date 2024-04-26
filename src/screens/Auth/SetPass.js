import { SafeAreaView, StyleSheet, Text, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { changePassByUserName } from '../../apis/authApi';




export const SetPass = ({ navigation, route }) => {
    const { userName } = route.params;
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const pass = watch('pass');
    const rpPass = watch('rpPass');

    const onSubmit = async (data) => {
        try {
            await changePassByUserName({
                username: userName,
                newPassword: data.pass
            });
            navigation.navigate('Login');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Cảnh báo',
                text2: 'Tài khoản không tồn tại  👋'
            });
            console.log(error)
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create Your New Password</Text>
            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        style={styles.input}
                        placeholder="Password"
                        onChange={(text) => onChange(text)}
                        value={value}
                        secureTextEntry={true}
                        err={errors.pass && errors.pass.message}
                        show={true}
                    />
                )}
                name="pass"
                rules={{
                    required: "Không được để trống mật khẩu",
                    minLength: {
                        value: 8,
                        message: "Mật khẩu mới phải từ 8 kí tự trở lên"
                    }
                }}
                defaultValue=""

            />


            <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                    <Input
                        style={styles.input}
                        placeholder="Repeat Password"
                        onChange={(text) => onChange(text)}
                        value={value}
                        secureTextEntry={true}
                        err={errors.rpPass && errors.rpPass.message}
                        show={true}
                    />
                )}
                name="rpPass"
                rules={{
                    required: true,
                    validate: (value) => value === pass || "Mật khẩu không khớp !"
                }}
                defaultValue=""
            />


            <Button title={'Thay đổi mật khẩu'} onPress={handleSubmit(onSubmit)}>Continue</Button>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});
