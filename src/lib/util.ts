import Konva from "konva";

export function canvasCreateVertex(
  input: {
    position: { x: number, y: number },
    label: string,
    onHover?: Konva.KonvaEventListener<Konva.Group, MouseEvent>,
    onClick?: Konva.KonvaEventListener<Konva.Group, MouseEvent>,
  }
): Konva.Group {
  const { position, label, onHover, onClick } = input;
  const circleRadius = 20;

  const group = new Konva.Group({
    x: position.x,
    y: position.y,
    width: circleRadius * 2,
    height: circleRadius * 2,
    draggable: true,
  });

  if (onHover) {
    group.on("hover", onHover);
  }

  if (onClick) {
    group.on("click", onClick);
  }

  const circle = new Konva.Circle({
    fill: "white",
    radius: circleRadius,
    stroke: "#171717",
    strokeWidth: 1,
  });

  const text = new Konva.Text({
    text: label,
    fill: "#171717",
    fontSize: 16,
    align: "center",
    verticalAlign: "middle",
  });

  text.x(-text.width() / 2);
  text.y(-text.height() / 2);

  group.add(circle);
  group.add(text);

  return group;
}