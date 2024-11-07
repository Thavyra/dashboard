import InputCheckBox from "@/components/forms/InputCheckBox";

export interface InputPermissionsProps {
    value: string[]
    valid?: boolean
    permissions: {
        name: string
        label: string
    }[]
}

export default function InputPermissions({ value, permissions, valid }: InputPermissionsProps) {
    return (
        <div className={`p-5 rounded-lg bg-dark-900 shadow-md transition ${getValidClass(valid)}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                {permissions.map(permission => {
                    return (
                        <InputCheckBox key={permission.name} id={permission.name} name={permission.name}
                            defaultChecked={!!value.find(x => x === permission.name)}>
                            {permission.label}
                        </InputCheckBox>
                    )
                })}
            </div>
        </div>
    )
}

function getValidClass(valid?: boolean) {
    switch (valid) {
        case undefined:
            return ""
        case true:
            return "border border-positive"
        case false:
            return "border border-negative"
    }
}
