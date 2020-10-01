package main

//Post - storing
type User struct {
	Username         int    `json:"username"`
	Password         string `json:"password"`
	Originalpassword string `json:"originalpassword"`
	Email            string `json:"email"`
}

type File struct {
	Filename string `json:"filename"`
}

type Files struct {
	FileId      int     `json:"file_id"`
	Filename    string  `json:"filename"`
	DeviceId    int     `json:"device_id"`
	DeviceName  string  `json:"device_name"`
	Filesize    float32 `json:"file_size"`
	FileVersion string  `json:"file_version"`
}
type jsonResponse struct {
	// message string `json:"message"`
	Message string `json:"message"`
	Email   string `json:"email"`
}

type Pie struct {
	SpaceOccupied float32 `json:"spaceOccupied"`
	SpaceLeft     float32 `json:"spaceLeft"`
	Plan          string  `json:"spacePlan"`
}

type Column struct {
	Files  int    `json:"files"`
	Device string `json:"device"`
}
