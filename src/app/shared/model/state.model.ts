export interface ActionObject {
    id : string;
    background :string;
    width : string;
    height : string;
    action ?: string;
}

export interface ContainerObject {
    id : string;
    background :string;
    top : string;
    left : string;
}
export interface ContainerPointObject {
    id : string;
    color :string;
    y : number;
    x : number;
}

export interface ColorObject {
    value : string;
    selected : boolean;
}