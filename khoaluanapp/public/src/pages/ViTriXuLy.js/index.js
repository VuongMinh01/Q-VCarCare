import { Button, Space, Typography } from "antd";
import React, { } from "react";
import OXuLy from "../../components/OXuLy";
export default function ViTriXuLy() {
    return (
        <div>

            <Typography.Title level={4} >Vị trí xử lý</Typography.Title>
            <Button style={{ marginBottom: "5px" }} >Thêm vị trí</Button>

            <OXuLy />
        </div>
    )
}