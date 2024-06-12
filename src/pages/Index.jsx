import React, { useState, useRef, useEffect } from 'react';
import { Box, Flex, Button, VStack } from '@chakra-ui/react';

const colors = ['#FF0000', '#FFFF00', '#0000FF', '#FFFFFF', '#000000'];

const Index = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = selectedColor;
    context.lineWidth = 5;
    contextRef.current = context;
  }, [selectedColor]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
      />
      <Flex position="absolute" top="10px" left="10px" zIndex="10">
        <VStack spacing={2}>
          {colors.map((color) => (
            <Button
              key={color}
              bg={color}
              width="40px"
              height="40px"
              border={selectedColor === color ? '2px solid black' : 'none'}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Index;