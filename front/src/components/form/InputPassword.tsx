
import { Divider } from 'primereact/divider';
import { Password } from 'primereact/password';

class Iprops {
    handlePassword!: Function;
    name!: string;
    labelname!: string;
}



export default function InputPassword(props: Iprops) {

    const footer = (
        <>
        <Divider />
        <p className="mt-2">Requisites</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 6 characters</li>
            </ul>
        </>
    )

    return (
        <div className="card flex justify-content-center">
            <span className="p-float-label">
                <Password id="password" placeholder={props.name} onChange={(e) => props.handlePassword} footer={footer} toggleMask />
                <label htmlFor="password">{props.labelname}</label>
            </span>
        </div>
    )

}