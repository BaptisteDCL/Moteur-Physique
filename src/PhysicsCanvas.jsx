import { useEffect, useRef } from "react";

export default function RigidBodySpringCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    const stiffness = 0.5;
    const b = -1;
    const angularB = -7;
    const dt = 0.02;

    /* ===== Vector ===== */
    class V {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      add(v) {
        return new V(this.x + v.x, this.y + v.y);
      }

      subtract(v) {
        return new V(this.x - v.x, this.y - v.y);
      }

      scale(s) {
        return new V(this.x * s, this.y * s);
      }

      cross(v) {
        return this.x * v.y - this.y * v.x;
      }

      rotate(angle, origin) {
        const x = this.x - origin.x;
        const y = this.y - origin.y;

        return new V(
          origin.x + (x * Math.cos(angle) - y * Math.sin(angle)),
          origin.y + (x * Math.sin(angle) + y * Math.cos(angle))
        );
      }
    }

    /* ===== Rectangle ===== */
    class Rect {
      constructor(x, y, w, h, m = 1) {
        this.width = w;
        this.height = h;
        this.m = m;

        this.topLeft = new V(x, y);
        this.topRight = new V(x + w, y);
        this.bottomRight = new V(x + w, y + h);
        this.bottomLeft = new V(x, y + h);

        this.v = new V(0, 0);
        this.a = new V(0, 0);

        this.theta = 0;
        this.omega = 0;
        this.alpha = 0;

        this.J = (this.m * (w * w + h * h)) / 12000;
      }

      center() {
        return this.topLeft.add(
          this.bottomRight.subtract(this.topLeft).scale(0.5)
        );
      }

      move(v) {
        this.topLeft = this.topLeft.add(v);
        this.topRight = this.topRight.add(v);
        this.bottomRight = this.bottomRight.add(v);
        this.bottomLeft = this.bottomLeft.add(v);
      }

      rotate(angle) {
        this.theta += angle;
        const c = this.center();

        this.topLeft = this.topLeft.rotate(angle, c);
        this.topRight = this.topRight.rotate(angle, c);
        this.bottomRight = this.bottomRight.rotate(angle, c);
        this.bottomLeft = this.bottomLeft.rotate(angle, c);
      }
    }

    /* ===== Scene ===== */
    const rect = new Rect(200, 0, 100, 50);
    rect.v = new V(0, 2);

    const spring = new V(200, 0);

    function loop() {
      let f = new V(0, 0);
      let torque = 0;

      /* --- Verlet Translation --- */
      const dr = rect.v
        .scale(dt)
        .add(rect.a.scale(0.5 * dt * dt));

      rect.move(dr.scale(100));

      /* --- Forces --- */
      f = f.add(new V(0, rect.m * 9.81));       // Gravity
      f = f.add(rect.v.scale(b));               // Damping

      const springForce = rect.topLeft
        .subtract(spring)
        .scale(-stiffness);

      const r = rect.center().subtract(rect.topLeft);
      torque += -r.cross(springForce);
      f = f.add(springForce);

      /* --- Finish Verlet --- */
      const newA = f.scale(1 / rect.m);
      const dv = rect.a.add(newA).scale(0.5 * dt);
      rect.v = rect.v.add(dv);
      rect.a = newA;

      /* --- Rotation (Euler) --- */
      torque += rect.omega * angularB;
      rect.alpha = torque / rect.J;
      rect.omega += rect.alpha * dt;
      rect.rotate(rect.omega * dt);

      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      ctx.save();
      ctx.translate(rect.topLeft.x, rect.topLeft.y);
      ctx.rotate(rect.theta);
      ctx.strokeRect(0, 0, rect.width, rect.height);
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(spring.x, spring.y);
      ctx.lineTo(rect.topLeft.x, rect.topLeft.y);
      ctx.stroke();
    }

    const interval = setInterval(loop, dt * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "1px solid black",
        background: "#fafafa"
      }}
    />
  );
}
