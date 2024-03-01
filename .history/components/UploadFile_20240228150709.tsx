import * as ReactDOM from 'react-dom';
import * as React from 'react';
import './uploader.css';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, RemovingEventArgs} from '@syncfusion/ej2-react-inputs';
import {CheckBoxComponent, ChangeEventArgs} from '@syncfusion/ej2-react-buttons';
import { Browser } from '@syncfusion/ej2-base';
import { useEffect, useRef, useState } from 'react';

const UploadFile = () => {
    // Uploader component

    const [isAutoUpload, setIsAutoUpload] = useState<boolean>(true);
    const [isSequentialUpload, setIsSequentialUpload] = useState<boolean>(false);
    let uploadObj = useRef<UploaderComponent>(null);
    let asyncSettings: object ;
    let dropContainerRef;
    let dropContainerEle: HTMLElement = null;
    dropContainerEle = null;
    dropContainerRef = element => {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/react/production/api/FileUploader/Remove'
    };

    const rendereComplete = (): void => {
        uploadObj.current.dropArea = dropContainerEle;
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
        uploadObj.current.dataBind();
    }

    const onChange = (args: ChangeEventArgs): void => {
        setIsAutoUpload(args.checked);
        uploadObj.current.clearAll();
    }
    const onChanged = (args: ChangeEventArgs): void => {
        setIsSequentialUpload(args.checked);
        uploadObj.current.clearAll();
    }
    const onRemoveFile = (args: RemovingEventArgs): void => {
        args.postRawFile = false;
    }

    return (
        <div className = 'control-pane' ref={dropContainerRef}>
            <div className='control-section row uploadpreview'>
            <div className='col-lg-9'>
            <div className='upload_wrapper'>
                {/* Render Uploader */}
                <UploaderComponent id='fileUpload' type='file' ref = {uploadObj} asyncSettings = {asyncSettings} removing= {onRemoveFile.bind(this)} autoUpload={isAutoUpload} sequentialUpload={isSequentialUpload}></UploaderComponent>
            </div>
            </div>
            <div className='property-section col-lg-3' id="uploader">
                <PropertyPane title='Properties'>
                    <div className = 'panel-style'>
                        <CheckBoxComponent checked={true} label='Auto Upload' change={onChange.bind(this)}></CheckBoxComponent>
                    </div>
                    <div className = 'panel-style'>
                        <CheckBoxComponent checked={false} label='Sequential Upload' change={onChanged.bind(this)}></CheckBoxComponent>
                    </div>
                </PropertyPane>
            </div>
            </div>
        </div>
    );
}
export default UploadFile;