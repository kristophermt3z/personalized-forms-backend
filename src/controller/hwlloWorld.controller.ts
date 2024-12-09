import { Request, Response } from "express";

export const helloWorld = async (
  req: Request,
  res: Response
) => {
  try {
    return res.json({
      "success": true,
      "message": "Hello, lets create forms :)"
    }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Falla en obtener la informacion",
      error: error,
    });
  }
};
